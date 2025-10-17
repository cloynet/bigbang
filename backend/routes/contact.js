import express from "express";
import nodemailer from "nodemailer";
import fetch from "node-fetch";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const getContactMailHTML = (name, email, subject, message) => `
  <div style="font-family: Arial, sans-serif; line-height:1.5; padding: 20px; background-color: #f9f9f9;">
    <div style="color:#777; font-size:14px; margin-bottom:10px;">Kimden: <strong>${name} &lt;${email}&gt;</strong></div>
    <h2 style="color:#333; margin-bottom:15px;">${subject}</h2>
    <div style="color:#555; white-space: pre-line;">${message}</div>
  </div>
`;

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message, token } = req.body;

    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" }
    );
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return res
        .status(400)
        .json({ success: false, error: "Recaptcha failed" });
    }

    const htmlContent = getContactMailHTML(name, email, subject, message);

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_USER,
      subject,
      text: message,
      html: htmlContent,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    return res.status(500).json({ success: false, error: String(error) });
  }
});

export default router;
