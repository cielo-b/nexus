import { Resend } from "resend";

type AttachmentType = {
  filename: string;
  content: Buffer;
};

type MailParameters = {
  email: string;
  subject: string;
  body: string;
  attachments?: AttachmentType[];
};

export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend("re_LhiTgQ2L_Q2aXyR6Q6g2ZawrveSZmTcsL");
  }

  async sendEmail({
    email,
    subject,
    body,
    attachments,
  }: MailParameters): Promise<void> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: "Nexus <info@insightnexus.africa>",
        to: email,
        subject,
        html: body,
        attachments: attachments?.map(attachment => ({
          filename: attachment.filename,
          content: attachment.content.toString('base64'),
        })),
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log("Email sent successfully", data);
    } catch (error: any) {
      console.error("Error sending email:", error);
      throw new Error(error.message);
    }
  }
}