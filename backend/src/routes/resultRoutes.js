const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/categories/:slug/results
router.get("/:slug/results", async (req, res) => {
  try {
    const slug = req.params.slug;

    // Find category
    const [cats] = await pool.execute(
      `SELECT id, title FROM categories WHERE slug = ? LIMIT 1`,
      [slug],
    );
    if (!cats.length)
      return res.status(404).json({ message: "Category not found" });

    const categoryId = cats[0].id;

    // Total valid votes for this category
    const [totRows] = await pool.execute(
      `SELECT COUNT(*) AS total
       FROM votes
       WHERE category_id = ? AND is_valid = 1`,
      [categoryId],
    );
    const totalVotes = Number(totRows[0]?.total || 0);

    // Votes grouped by nominee (include nominees with 0 votes too)
    const [rows] = await pool.execute(
      `SELECT
         n.id AS nomineeId,
         n.name,
         n.company,
         n.image_url,
         COUNT(v.id) AS votes
       FROM nominees n
       LEFT JOIN votes v
         ON v.nominee_id = n.id
         AND v.category_id = ?
         AND v.is_valid = 1
       WHERE n.category_id = ? AND n.is_active = 1
       GROUP BY n.id
       ORDER BY votes DESC, n.name ASC`,
      [categoryId, categoryId],
    );

    const results = rows.map((r) => {
      const votes = Number(r.votes || 0);
      const percent =
        totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 1000) / 10; // 1 decimal
      return { ...r, votes, percent };
    });

    res.json({
      categoryId,
      totalVotes,
      results,
    });
  } catch (err) {
    console.error("Results error:", err);
    res.status(500).json({ message: "Server error while loading results" });
  }
});

module.exports = router;
