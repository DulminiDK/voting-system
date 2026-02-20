const nodemailer = require("nodemailer");

const useConsoleMail = process.env.MAIL_CONSOLE === "1";

let transporter = null;

if (!useConsoleMail) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendOtpEmail(toEmail, otp) {
  if (useConsoleMail) {
    console.log("[MAIL_CONSOLE] OTP for", toEmail, "=>", otp);
    return;
  }

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: toEmail,
    subject: "Your voting OTP code",
    text: `Your OTP is: ${otp}\n\nThis code expires in 10 minutes.`,
  });
}

module.exports = { sendOtpEmail };
