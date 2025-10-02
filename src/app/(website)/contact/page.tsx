'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'
import { contactFormSchema, validateContactForm, type ContactFormData } from '@/lib/validation/contactForm'

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    relatesTo: 'jobs' as const,
    hearAbout: '',
    privacyConsent: false,
    newsletterConsent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isFormInView = useInView(formRef, { once: true })

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  // Animated title effect
  const titleText = "Let's Talk"
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    if (isHeroInView) {
      const timer = setInterval(() => {
        setVisibleChars(prev => {
          if (prev < titleText.length) {
            return prev + 1
          }
          return prev
        })
      }, 100)

      return () => clearInterval(timer)
    }
  }, [isHeroInView])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // Clear server error when user makes changes
    if (serverError) {
      setServerError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setValidationErrors({})
    setServerError('')
    
    try {
      // Client-side validation
      const validation = validateContactForm(formData)
      
      if (!validation.success) {
        const errors: Record<string, string> = {}
        validation.errors.forEach(error => {
          errors[error.field] = error.message
        })
        setValidationErrors(errors)
        setIsSubmitting(false)
        return
      }

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          message: '',
          relatesTo: 'jobs' as const,
          hearAbout: '',
          privacyConsent: false,
          newsletterConsent: false
        })
      } else {
        setSubmitStatus('error')
        if (result.errors && Array.isArray(result.errors)) {
          const errors: Record<string, string> = {}
          result.errors.forEach((error: any) => {
            errors[error.field] = error.message
          })
          setValidationErrors(errors)
        } else {
          setServerError(result.message || 'An error occurred while submitting the form')
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Title */}
      <section ref={heroRef} className="py-20 pt-[20vh] bg-gradient-to-br from-blue-50 to-blue-100 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={staggerItem} className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                {titleText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: index < visibleChars ? 1 : 0,
                      transition: { delay: index * 0.1 }
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block ml-2"
                >
                  _
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.div variants={staggerItem} className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed">
  At Insight Nexus, we provide expert consultancy across diverse sectors to accelerate growth 
  and sustainable development. Whether you’re optimizing existing strategies or building new 
  frameworks from the ground up, we help you uncover credible insights, streamline decision-making, 
  and drive measurable impact that strengthens both performance and long-term success.
</p>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-2xl mx-auto"
          >
            <motion.div variants={staggerItem} className="text-center mb-12">
              <h2 className="text-4xl  font-bold text-gray-900 mb-6">
                Let's connect
              </h2>
              <p className="text-lg text-gray-600">
                Ready to start your impact journey? We'd love to hear from you.
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {validationErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        validationErrors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {validationErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@companyemail.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      validationErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>

                {/* Company Field */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name (optional)"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      validationErrors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {validationErrors.company && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.company}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Please include any details to help us connect you with the right person on the team."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                      validationErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {validationErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>
                  )}
                </div>

                {/* Dropdown Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="relatesTo" className="block text-sm font-medium text-gray-700 mb-2">
                      My message relates to <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="relatesTo"
                      name="relatesTo"
                      value={formData.relatesTo}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        validationErrors.relatesTo ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select an option</option>
                      <option value="jobs">Jobs at Insight Nexus</option>
                      <option value="project">Scoping a potential project</option>
                      <option value="press">Press/Other</option>
                    </select>
                    {validationErrors.relatesTo && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.relatesTo}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        validationErrors.hearAbout ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select an option</option>
                      <option value="online">Online</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="word-of-mouth">Word of mouth</option>
                      <option value="conference">Conference</option>
                      <option value="email">Email</option>
                      <option value="other">Other (please share in your message)</option>
                    </select>
                    {validationErrors.hearAbout && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.hearAbout}</p>
                    )}
                  </div>
                </div>

                {/* Privacy Policy Consent */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleInputChange}
                      className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                        validationErrors.privacyConsent ? 'border-red-500' : ''
                      }`}
                    />
                    <label htmlFor="privacyConsent" className="text-sm w-[90%] text-gray-700">
                      I consent to my data being collected and stored in line with the guidelines set out in the Insight Nexus{' '}
                      <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      . <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {validationErrors.privacyConsent && (
                    <p className="text-sm text-red-600">{validationErrors.privacyConsent}</p>
                  )}

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="newsletterConsent"
                      name="newsletterConsent"
                      checked={formData.newsletterConsent}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletterConsent" className="text-sm text-gray-700">
                      I'd like to receive updates and insights from Insight Nexus.
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit</span>
                        <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center"
                  >
                    <Icon icon="mdi:check-circle" className="w-6 h-6 mx-auto mb-2" />
                    <p>Thank you for your message! We'll get back to you soon.</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-center"
                  >
                    <Icon icon="mdi:alert-circle" className="w-6 h-6 mx-auto mb-2" />
                    <p>{serverError || 'There was an error submitting your message. Please try again.'}</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
