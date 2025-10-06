type AttachmentType = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type MailParameters = {
  email: string;
  subject: string;
  body: string;
  attachments?: AttachmentType[];
};

export class MailService {
  async sendEmail({
    email,
    subject,
    body,
    attachments,
  }: MailParameters): Promise<void> {
    const serviceUrl = process.env.EMAIL_API_URL || ''

    if (!serviceUrl) {
      throw new Error('Email service URL is not configured (set EMAIL_SERVICE_URL)')
    }

    // Map Buffer attachments to base64 payload expected by backend
    const mappedAttachments = (attachments || []).map(att => ({
      filename: att.filename,
      content: att.content.toString('base64'),
      contentType: att.contentType || 'application/octet-stream',
    }))

    // Optional SMTP overrides pulled from env and forwarded to backend
    const payload: any = {
      to: email,
      subject,
      html: body,
      // backend defaults type to "info"; we explicitly send "info"
      type: 'info',
      attachments: mappedAttachments,
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true' || undefined,
      infoEmail: process.env.SMTP_USER,
      infoPassword: process.env.SMTP_PASS,
      fromTitle: "Insight Nexus",
    }

    try {
      const response = await fetch(`${serviceUrl.replace(/\/$/, '')}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        let details: any = undefined
        try {
          details = await response.json()
        } catch {
          // ignore body parse errors
        }
        const message = details?.error || details?.message || response.statusText
        throw new Error(`Email service error: ${message}`)
      }

      // Best-effort log
      try {
        const data = await response.json()
        if (data?.message) {
          console.log('Email service:', data.message)
        }
      } catch {
        // ignore
      }
    } catch (error: any) {
      console.error('Email sending failed:', error)
      throw new Error(error?.message || 'Failed to send email')
    }
  }
}
