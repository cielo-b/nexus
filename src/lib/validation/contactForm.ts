import { z } from 'zod'

// Client-side validation schema (same as server-side for consistency)
export const contactFormSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email is too long'),
  company: z.string()
    .max(100, 'Company name is too long')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long')
    .regex(/^[\s\S]*[a-zA-Z][\s\S]*$/, 'Message must contain at least some text'),
  relatesTo: z.enum(['jobs', 'project', 'press'], {
    errorMap: () => ({ message: 'Please select what your message relates to' })
  }),
  hearAbout: z.string()
    .max(100, 'How you heard about us is too long')
    .optional()
    .or(z.literal('')),
  privacyConsent: z.boolean()
    .refine(val => val === true, {
      message: 'You must consent to the privacy policy to submit this form'
    }),
  newsletterConsent: z.boolean().optional()
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Validation helper function
export const validateContactForm = (data: unknown) => {
  try {
    const validatedData = contactFormSchema.parse(data)
    return { success: true, data: validatedData, errors: [] }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'general', message: 'An unexpected error occurred' }]
    }
  }
}

