const express = require("express");
const pool = require("../db");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

/**
 * POST /api/votes
 * Body: { categoryId, nomineeId }
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId, nomineeId } = req.body;

    if (!categoryId || !nomineeId) {
      return res
        .status(400)
        .json({ message: "Missing categoryId or nomineeId" });
    }

    // 1️⃣ Check category exists
    const [catRows] = await pool.execute(
      `SELECT id, vote_frequency_minutes, status, end_at
       FROM categories
       WHERE id = ?`,
      [categoryId],
    );

    if (!catRows.length) {
      return res.status(404).json({ message: "Category not found" });
    }

    const category = catRows[0];

    if (category.status !== "ongoing") {
      return res
        .status(400)
        .json({ message: "Voting is not active for this category" });
    }

    if (category.end_at && new Date(category.end_at) < new Date()) {
      return res.status(400).json({ message: "Voting has ended" });
    }

    // 2️⃣ Check nominee belongs to category
    const [nomRows] = await pool.execute(
      `SELECT id FROM nominees WHERE id = ? AND category_id = ? AND is_active = 1`,
      [nomineeId, categoryId],
    );

    if (!nomRows.length) {
      return res.status(400).json({ message: "Invalid nominee" });
    }

    // 3️⃣ Check last vote time
    const [lastVoteRows] = await pool.execute(
      `SELECT created_at
       FROM votes
       WHERE user_id = ?
         AND category_id = ?
         AND is_valid = 1
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId, categoryId],
    );

    const frequencyMinutes = category.vote_frequency_minutes || 60;

    if (lastVoteRows.length) {
      const lastVoteTime = new Date(lastVoteRows[0].created_at);
      const now = new Date();

      const diffMinutes = (now - lastVoteTime) / (1000 * 60);

      if (diffMinutes < frequencyMinutes) {
        const remaining = Math.ceil(frequencyMinutes - diffMinutes);

        return res.status(429).json({
          message: `You can vote again in ${remaining} minute(s).`,
          nextAllowedInMinutes: remaining,
        });
      }
    }

    // 4️⃣ Insert vote
    await pool.execute(
      `INSERT INTO votes
       (category_id, nominee_id, user_id, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?)`,
      [
        categoryId,
        nomineeId,
        userId,
        req.ip,
        req.headers["user-agent"] || null,
      ],
    );

    return res.json({
      message: "Vote recorded successfully",
      nextAllowedInMinutes: frequencyMinutes,
    });
  } catch (err) {
    console.error("Vote error:", err);
    return res.status(500).json({ message: "Server error while voting" });
  }
});

module.exports = router;
