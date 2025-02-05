type RequestDemoClientMail = {
  firstName: string;
};

export const requestDemoClientMail = ({
  firstName
}: RequestDemoClientMail) => `<!DOCTYPE html>
<html>
<head>
    <title>Thank You for Your Inquiry - Nexus</title>
</head>
<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto;">
        <h2 style="text-align: center;">Thank You for Your Inquiry - Nexus</h2>
        <p>Dear ${firstName},</p>
        <p>Thank you for reaching out to Nexus. We have received your inquiry and are reviewing the details.</p>
        <p>We will respond soon. If you need immediate assistance, please contact us at <a href="mailto:team.nexus@gmail.com">team.nexus@gmail.com</a>.</p>
        <p>Best Regards</p>
        <i>Nexus</i>
    </div>
</body>
</html>`;
