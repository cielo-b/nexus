type RequestDemoUserMail = {
  name: string;
  email: string;
  message: string;
};

export const requestDemoAdminMail = ({
  name,
  email,
  message
}: RequestDemoUserMail) => `<!DOCTYPE html>
<html>
<head>
    <title>New Email Request - InsightNexus</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    </style>
</head>
<body style="font-family: 'Open Sans', Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f7fa">
        <tr>
            <td align="center" valign="top">
                <!-- Header -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px 8px 0 0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <tr>
                        <td style="padding: 30px 0; text-align: center; background-color: #1a3e72;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">InsightNexus</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center;">
                            <h2 style="color: #1a3e72; margin: 0 0 20px 0; font-size: 22px; font-weight: 700;">New Email Request Received</h2>
                            <p style="color: #4a5568; margin: 0; font-size: 16px; line-height: 1.6;">A visitor has sent an email through our website.</p>
                        </td>
                    </tr>
                </table>

                <!-- Content -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <div style="background-color: #f8fafc; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                                <h3 style="color: #1a3e72; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h3>
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td width="100" style="padding: 5px 0; color: #4a5568; font-weight: 600;">Name:</td>
                                        <td style="padding: 5px 0; color: #2d3748;">${name}</td>
                                    </tr>
                                    <tr>
                                        <td width="100" style="padding: 5px 0; color: #4a5568; font-weight: 600;">Email:</td>
                                        <td style="padding: 5px 0;">
                                            <a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100" style="padding: 5px 0; color: #4a5568; font-weight: 600;">Message:</td>
                                        <td style="padding: 5px 0; color: #2d3748;">${message}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>

                <!-- Footer -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="color: #718096; margin: 0 0 15px 0; font-size: 14px;">Please review this request and take appropriate action.</p>
                            <p style="color: #718096; margin: 0; font-size: 14px;">
                                <strong>InsightNexus Team</strong><br>
                                <span style="color: #a0aec0;">Empowering Change Through Expert Consultancy</span>
                            </p>
                        </td>
                    </tr>
                </table>

                <!-- Copyright -->
                <table width="600" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding: 20px 0; text-align: center;">
                            <p style="color: #a0aec0; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} InsightNexus. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
