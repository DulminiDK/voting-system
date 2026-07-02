const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [categories] = await pool.execute(`
      SELECT id, title
      FROM categories
      WHERE status = 'ongoing'
      ORDER BY title
    `);

    const leaderboard = [];

    for (const category of categories) {
      const [results] = await pool.execute(
        `
        SELECT
          n.id AS nomineeId,
          n.name,
          n.company,
          COUNT(v.id) AS votes
        FROM nominees n
        LEFT JOIN votes v
          ON v.nominee_id = n.id
          AND v.is_valid = 1
        WHERE n.category_id = ?
          AND n.is_active = 1
        GROUP BY n.id
        ORDER BY votes DESC, n.name ASC
        LIMIT 3
        `,
        [category.id],
      );

      leaderboard.push({
        categoryId: category.id,
        categoryTitle: category.title,
        leaders: results,
      });
    }

    res.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);

    res.status(500).json({
      message: "Failed to load leaderboard",
    });
  }
});

module.exports = router;
