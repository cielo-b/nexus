import type { NextApiRequest, NextApiResponse } from "next";
import { z } from 'zod';
import { MailService } from '@/services/mail.service';

export const runtime = 'edge';
// Validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100, 'Company name is too long').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
  relatesTo: z.enum(['jobs', 'project', 'press'], {
    errorMap: () => ({ message: 'Please select a valid option' })
  }),
  hearAbout: z.string().max(100, 'How you heard about us is too long').optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to the privacy policy'
  }),
  newsletterConsent: z.boolean().optional()
});

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  const mailService = new MailService();
  
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(req.body);

    // Email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message Details</h3>
          <p><strong>Relates to:</strong> ${validatedData.relatesTo}</p>
          ${validatedData.hearAbout ? `<p><strong>How they heard about us:</strong> ${validatedData.hearAbout}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
            ${validatedData.message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Consent</h3>
          <p><strong>Privacy Policy Consent:</strong> ${validatedData.privacyConsent ? 'Yes' : 'No'}</p>
          <p><strong>Newsletter Consent:</strong> ${validatedData.newsletterConsent ? 'Yes' : 'No'}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>This message was sent from the Insight Nexus contact form.</p>
          <p>Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Send email using MailService
    await mailService.sendEmail({
      email: process.env.CONTACT_EMAIL || process.env.EMAIL || "",
      subject: `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
      body: emailContent,
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error: any) {
    console.log("ERROR: ", error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Please check your form data and try again.',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again later.'
    });
  }
}
