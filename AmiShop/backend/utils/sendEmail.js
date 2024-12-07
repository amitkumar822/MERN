import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message, html }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email provider's service
    auth: {
      user: process.env.SMTP_EMAIL, // Your email
      pass: process.env.SMTP_EMAIL_APP_PASSWORD, // Your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    text: message, // Plain text fallback
    html, // HTML email content
  };

  await transporter.sendMail(mailOptions);
};
