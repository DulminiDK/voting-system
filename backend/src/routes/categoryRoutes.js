const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/categories
router.get("/", async (req, res) => {
  const [rows] = await pool.execute(
    `SELECT id, slug, title, status, end_at, vote_frequency_minutes, instagram_url
     FROM categories
     ORDER BY id DESC`,
  );
  res.json(rows);
});

// GET /api/categories/:slug
router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;

  const [rows] = await pool.execute(
    `SELECT id, slug, title, description_html, status, end_at, vote_frequency_minutes, instagram_url
     FROM categories
     WHERE slug = ?
     LIMIT 1`,
    [slug],
  );

  if (!rows.length)
    return res.status(404).json({ message: "Category not found" });

  res.json(rows[0]);
});

// GET /api/categories/:slug/nominees
router.get("/:slug/nominees", async (req, res) => {
  const slug = req.params.slug;

  const [cats] = await pool.execute(
    `SELECT id FROM categories WHERE slug = ? LIMIT 1`,
    [slug],
  );
  if (!cats.length)
    return res.status(404).json({ message: "Category not found" });

  const categoryId = cats[0].id;

  const [rows] = await pool.execute(
    `SELECT id, name, company, image_url
     FROM nominees
     WHERE category_id = ? AND is_active = 1
     ORDER BY name ASC`,
    [categoryId],
  );

  res.json(rows);
});

// GET /api/categories/:slug/results
const jwt = require("jsonwebtoken");

router.get("/:slug/results", async (req, res) => {
  try {
    const slug = req.params.slug;

    // get category id

    const [cats] = await pool.execute(
      `SELECT id FROM categories WHERE slug = ? LIMIT 1`,
      [slug],
    );

    if (!cats.length)
      return res.status(404).json({ message: "Category not found" });

    const categoryId = cats[0].id;

    // get results

    const [rows] = await pool.execute(
      `SELECT
        n.id AS nomineeId,
        n.name,
        n.company,
        COUNT(v.id) AS votes

      FROM nominees n

      LEFT JOIN votes v
      ON v.nominee_id = n.id

      WHERE n.category_id = ?
      AND n.is_active = 1

      GROUP BY n.id
      ORDER BY votes DESC`,

      [categoryId],
    );

    const totalVotes = rows.reduce((sum, r) => sum + r.votes, 0);

    const results = rows.map((r) => ({
      nomineeId: r.nomineeId,
      name: r.name,
      company: r.company,
      votes: r.votes,
      percent: totalVotes ? Math.round((r.votes / totalVotes) * 100) : 0,
    }));

    // ===== COOLDOWN CALCULATION =====

    let cooldownActive = false;

    const auth = req.headers.authorization;

    if (auth) {
      const token = auth.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decoded.id;

      const [lastVote] = await pool.execute(
        `SELECT created_at
         FROM votes
         WHERE user_id = ?
         AND category_id = ?
         ORDER BY created_at DESC
         LIMIT 1`,

        [userId, categoryId],
      );

      if (lastVote.length) {
        const last = new Date(lastVote[0].created_at);

        const now = new Date();

        const diffMinutes = (now - last) / 1000 / 60;

        cooldownActive = diffMinutes < 60;
      }
    }

    res.json({
      totalVotes,
      results,
      cooldownActive,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
