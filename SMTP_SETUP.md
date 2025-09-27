# SMTP Configuration for Contact Form

This document explains how to set up SMTP email functionality for the contact form.

## Environment Variables

Add the following variables to your `.env.local` file:

```env
# SMTP Configuration for Contact Form
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=contact@insightnexus.africa
```

## SMTP Service Providers

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```
**Note:** You need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password as `SMTP_PASS`

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
```

## Features

- ✅ Professional email templates
- ✅ Client-side and server-side validation
- ✅ Real-time error feedback
- ✅ Form field validation with Zod
- ✅ Responsive design
- ✅ Loading states
- ✅ Success/error messaging
- ✅ Privacy consent validation
- ✅ Email sanitization

## Validation Rules

- **First Name**: Required, 1-50 characters, letters only
- **Last Name**: Required, 1-50 characters, letters only
- **Email**: Required, valid email format, max 100 characters
- **Company**: Optional, max 100 characters
- **Message**: Required, 10-2000 characters, must contain text
- **Relates To**: Required, must select from dropdown
- **How You Heard About Us**: Optional, max 100 characters
- **Privacy Consent**: Required checkbox

## Testing

1. Fill out the contact form
2. Check that validation works for each field
3. Submit the form
4. Check your email for the contact form submission
5. Verify the email contains all form data properly formatted

