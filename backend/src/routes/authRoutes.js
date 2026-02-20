const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const pool = require("../db");
const { sendOtpEmail } = require("../mailer");

const router = express.Router();

const OTP_EXPIRE_MIN = 10;
const OTP_MAX_ATTEMPTS = 5;

// helper
function genOtp() {
  // 6-digit
  return String(Math.floor(100000 + Math.random() * 900000));
}

// POST /api/auth/request-otp
router.post("/request-otp", async (req, res) => {
  const schema = z.object({ email: z.string().email() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ message: "Invalid email" });

  const email = parsed.data.email.toLowerCase().trim();
  const otp = genOtp();
  const otpHash = await bcrypt.hash(otp, 10);

  const expiresAt = new Date(Date.now() + OTP_EXPIRE_MIN * 60 * 1000);

  // store OTP row
  await pool.execute(
    `INSERT INTO email_otps (email, otp_hash, expires_at) VALUES (?, ?, ?)`,
    [email, otpHash, expiresAt],
  );

  // send email (or console)
  await sendOtpEmail(email, otp);

  return res.json({ message: "OTP sent" });
});

// POST /api/auth/verify-otp
router.post("/verify-otp", async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    otp: z.string().min(6).max(6),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ message: "Invalid input" });

  const email = parsed.data.email.toLowerCase().trim();
  const otp = parsed.data.otp.trim();

  // get latest valid OTP (not consumed, not expired)
  const [rows] = await pool.execute(
    `SELECT * FROM email_otps
     WHERE email = ?
       AND consumed_at IS NULL
       AND expires_at > NOW()
     ORDER BY id DESC
     LIMIT 1`,
    [email],
  );

  if (!rows.length)
    return res.status(400).json({ message: "OTP expired or not found" });

  const otpRow = rows[0];

  if (otpRow.attempts >= OTP_MAX_ATTEMPTS) {
    return res
      .status(429)
      .json({ message: "Too many attempts. Request a new OTP." });
  }

  const ok = await bcrypt.compare(otp, otpRow.otp_hash);

  // increment attempts always
  await pool.execute(
    `UPDATE email_otps SET attempts = attempts + 1 WHERE id = ?`,
    [otpRow.id],
  );

  if (!ok) return res.status(400).json({ message: "Invalid OTP" });

  // consume
  await pool.execute(`UPDATE email_otps SET consumed_at = NOW() WHERE id = ?`, [
    otpRow.id,
  ]);

  // find or create user
  const [urows] = await pool.execute(
    `SELECT id, email FROM users WHERE email = ? LIMIT 1`,
    [email],
  );
  let userId;
  if (urows.length) {
    userId = urows[0].id;
  } else {
    const [ins] = await pool.execute(`INSERT INTO users (email) VALUES (?)`, [
      email,
    ]);
    userId = ins.insertId;
  }

  // JWT
  const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  return res.json({
    message: "Verified",
    token,
    user: { id: userId, email },
  });
});

module.exports = router;
