const jwt = require("jsonwebtoken");
const pool = require("../db");

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";

    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token)
      return res.status(401).json({
        message: "No token provided",
      });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 fetch full user including role

    const [rows] = await pool.execute(
      "SELECT id, email, role FROM users WHERE id = ?",

      [payload.id],
    );

    if (!rows.length)
      return res.status(401).json({
        message: "User not found",
      });

    req.user = rows[0];

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = requireAuth;
