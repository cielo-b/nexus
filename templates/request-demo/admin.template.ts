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
    <title>New Submission from Landing Page</title>
</head>
<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto;">
        <h2>New Submission from Landing Page</h2>
        <p>Hello Team,</p>
        <p>A new submission has been received from the landing page. Below are the details:</p>
        <ul>
            <li><strong>Names:</strong> ${name}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Please review the information and take necessary action as needed.</p>
        <p>Best regards</p>
    </div>
</body>
</html>
`;
