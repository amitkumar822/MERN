import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email provider's service
    auth: {
      user: process.env.SMTP_EMAIL, // Your email
      pass: process.env.SMTP_EMAIL_APP_PASSWORD, // Your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    // to: email,
    to: "ak7772100@gmail.com",
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
