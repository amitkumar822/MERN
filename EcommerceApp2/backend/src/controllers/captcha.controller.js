import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { Captcha } from "../models/captcha.modals.js";

// Helper function to generate a random 4-character CAPTCHA code
const generateCaptchaCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 4; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

// Controller to generate a CAPTCHA code
export const generateCaptcha = async (req, res) => {
  const email = req?.user?.email;

  // Generate the CAPTCHA code
  const captchaCode = generateCaptchaCode();

  // Set expiration time (5 minutes from now)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Save the CAPTCHA code to the database
  const captcha = await Captcha.create({ code: captchaCode, expiresAt });

  // Send the CAPTCHA code to the user's email address
  await sendEmail({
    email,
    subject: "E-commerce App - CAPTCHA Code",
    message: `Your CAPTCHA code is: ${captchaCode}`, // Plain text fallback
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 style="color: #4CAF50; margin-bottom: 16px;">E-commerce App - CAPTCHA Code</h2>
      <p>Your CAPTCHA code is:</p>
      <p style="font-size: 24px; font-weight: bold; color: #ff5722; background-color: #FFEB3B; padding: 5px 6px; display: inline-block; border-radius: 4px;">${captchaCode}</p>
      <p style="margin-top: 16px; color: #555;">This CAPTCHA code will expire in <strong>5 minutes</strong>.</p>
      <p style="margin-top: 16px;">If you did not request this, please ignore this email.</p>
    </div>
  `,
  });

  // Respond with the CAPTCHA code
  res.status(201).json({
    success: true,
    data: {
      id: captcha._id, // Return the ID for reference (if needed)
      code: captcha.code,
      expiresAt: captcha.expiresAt,
    },
    message: "Captcha generated successfully",
  });
};

export const getCaptcha = asyncHandler(async (req, res) => {
  const captcha = await Captcha.find();
  if (!captcha) {
    return res.status(404).json({ message: "No CAPTCHA found" });
  }
  res
    .status(200)
    .json({ message: "All CAPTCHAs fetched successfully", captcha });
});
