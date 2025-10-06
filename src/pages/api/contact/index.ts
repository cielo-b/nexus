import type { NextApiRequest, NextApiResponse } from "next";
import { MailService } from '@/services/mail.service';

export const runtime = 'edge';

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const send = (status: number, body: any) => {
    const maybeRes: any = res as any
    if (maybeRes && typeof maybeRes.status === 'function') {
      return maybeRes.status(status).json(body)
    }
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' }
    }) as any
  }
  
  // Parse body in a way that works across runtimes (Node API vs Edge-like)
  const getBody = async () => {
    const anyReq: any = req as any
    
    // Debug logging
    console.log("Request method:", anyReq?.method)
    console.log("Request body type:", typeof anyReq?.body)
    console.log("Request body:", anyReq?.body)
    
    // If Next already parsed it
    if (anyReq?.body) {
      const b = anyReq.body
      if (typeof b === 'string') {
        try { 
          const parsed = JSON.parse(b)
          console.log("Parsed from string:", parsed)
          return parsed 
        } catch (e) { 
          console.log("Failed to parse string body:", e)
          return {} 
        }
      }
      console.log("Using existing body:", b)
      return b
    }
    
    // Try web request helpers if present
    if (typeof anyReq?.json === 'function') {
      try { 
        const parsed = await anyReq.json()
        console.log("Parsed from json():", parsed)
        return parsed 
      } catch (e) {
        console.log("Failed to parse with json():", e)
      }
    }
    
    if (typeof anyReq?.text === 'function') {
      try { 
        const text = await anyReq.text()
        const parsed = JSON.parse(text)
        console.log("Parsed from text():", parsed)
        return parsed 
      } catch (e) {
        console.log("Failed to parse with text():", e)
      }
    }
    
    console.log("No body found, returning empty object")
    return {}
  }
  if (req.method !== 'POST') {
    return send(405, { 
      success: false, 
      message: 'Method not allowed' 
    })
  }

  const mailService = new MailService();
  
  try {
    // Parse the form data (validation already done on frontend)
    const rawBody = await getBody()
    
    // Basic check for required fields
    if (!rawBody || typeof rawBody !== 'object') {
      return send(400, {
        success: false,
        message: 'Invalid request data'
      })
    }
    
    const { firstName, lastName, email, company, message, relatesTo, hearAbout, privacyConsent, newsletterConsent } = rawBody


    console.log("rawBody: ", firstName);
    // Email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message Details</h3>
          <p><strong>Relates to:</strong> ${relatesTo}</p>
          ${hearAbout ? `<p><strong>How they heard about us:</strong> ${hearAbout}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
            ${message?.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Consent</h3>
          <p><strong>Privacy Policy Consent:</strong> ${privacyConsent ? 'Yes' : 'No'}</p>
          <p><strong>Newsletter Consent:</strong> ${newsletterConsent ? 'Yes' : 'No'}</p>
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
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      body: emailContent,
    });

    return send(200, {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    })

  } catch (error: any) {
    console.log("ERROR: ", error);
    
    // Handle all errors
    return send(500, {
      success: false,
      message: 'There was an error sending your message. Please try again later.'
    })
  }
}
