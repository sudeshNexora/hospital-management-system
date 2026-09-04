import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Sends an email and swallows errors so a mail failure never breaks
// the booking/cancellation flow itself.
const sendMail = async ({ to, subject, html }) => {
  try {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.log("SMTP not configured - skipping email:", subject);
      return;
    }
    await transporter.sendMail({
      from: `"Prescripto" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", subject, "->", to);
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};

export default sendMail;
