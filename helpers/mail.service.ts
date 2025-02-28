import * as nodemailer from "nodemailer";

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
  async sendEmail({
    email,
    subject,
    body,
    attachments,
  }: MailParameters): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "Nexus",
        address: process.env.EMAIL || "",
      },
      to: email,
      subject,
      html: body,
      attachments: attachments || [],
    };

    const sendMailAsync = (options: nodemailer.SendMailOptions) =>
      new Promise<void>((resolve, reject) => {
        transporter.sendMail(
          options,
          (error: any, info: { response: string }) => {
            if (error) {
              reject(error);
            } else {
              console.log("Email sent: " + info.response);
              resolve();
            }
          }
        );
      });

    try {
      await sendMailAsync(mailOptions);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
