type RequestDemoClientMail = {
  firstName: string;
};

export const requestDemoClientMail = ({
  firstName
}: RequestDemoClientMail) => `<!DOCTYPE html>
<html>
<head>
    <title>Thank You for Your Inquiry - InsightNexus</title>
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
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">InsightNews</h1>
                            <p style="color: #a0c4ff; margin: 10px 0 0 0; font-size: 16px;">Empowering Change Through Expert Consultancy</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center;">
                            <h2 style="color: #1a3e72; margin: 0 0 20px 0; font-size: 22px; font-weight: 700;">Thank You, ${firstName}!</h2>
                            <p style="color: #4a5568; margin: 0; font-size: 16px; line-height: 1.6;">We've received your inquiry and appreciate your interest in our services.</p>
                        </td>
                    </tr>
                </table>

                <!-- Content -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <tr>
                        <td style="padding: 20px 40px;">
                            <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">Dear ${firstName},</p>
                            <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">Thank you for reaching out to InsightNexus. Our team is currently reviewing your request and will respond to you shortly.</p>
                            
                            <div style="background-color: #f8fafc; border-radius: 6px; padding: 20px; margin: 20px 0;">
                                <h3 style="color: #1a3e72; margin: 0 0 15px 0; font-size: 18px;">What to Expect Next</h3>
                                <ul style="color: #4a5568; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                                    <li style="margin-bottom: 8px;">Confirmation call or email from our team</li>
                                    <li style="margin-bottom: 8px;">Detailed information about our services</li>
                                    <li style="margin-bottom: 8px;">Response to your enquiry</li>
                                </ul>
                            </div>
                            
                            <p style="color: #4a5568; margin: 20px 0; font-size: 16px; line-height: 1.6;">For immediate assistance, please contact us at <a href="mailto:info@insightnexus.africa" style="color: #3182ce; text-decoration: none;">info@insightnexus.africa</a>.</p>
                        </td>
                    </tr>
                </table>

                <!-- Footer -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="color: #718096; margin: 0 0 15px 0; font-size: 14px;">We look forward to serving you!</p>
                            <p style="color: #718096; margin: 0; font-size: 14px;">
                                <strong>InsightNexus Team</strong><br>
                                <span style="color: #a0aec0;">Delivering data-driven insights for sustainable change</span>
                            </p>
                        </td>
                    </tr>
                </table>

                <!-- Social Links -->
                <table width="600" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding: 20px 0; text-align: center; background-color: #1a3e72; border-radius: 0 0 8px 8px;">
                            <a href="https://www.instagram.com/insightnexus_c?igsh=OTd4ZWpudm95Nmxj" style="display: inline-block; margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" style="border: 0;"></a>
                            <a href="https://www.facebook.com/profile.php?id=61564435222131" style="display: inline-block; margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" style="border: 0;"></a>
                            <a href="https://x.com/insightnexus_c" style="display: inline-block; margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="24" style="border: 0;"></a>
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
</html>`;
