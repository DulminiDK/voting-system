const express = require("express");
const router = express.Router();

const pool = require("../db");
const requireAuth = require("../middlewares/requireAuth");

/* GET comments */

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const [cat] = await pool.execute("SELECT id FROM categories WHERE slug=?", [
      slug,
    ]);

    if (!cat.length) return res.status(404).json({ message: "Not found" });

    const categoryId = cat[0].id;

    const [rows] = await pool.execute(
      `SELECT
c.*,
u.email,
u.display_name

       FROM comments c
       JOIN users u ON c.user_id = u.id

       WHERE category_id=?
       ORDER BY created_at DESC`,

      [categoryId],
    );

    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/* ADD comment */

router.post("/", requireAuth, async (req, res) => {
  try {
    const { categoryId, content, parentId } = req.body;

    if (parentId) {
      const [rows] = await pool.execute(
        "SELECT parent_id FROM comments WHERE id = ?",
        [parentId],
      );

      if (!rows.length) {
        return res.status(404).json({
          message: "Parent comment not found.",
        });
      }

      if (rows[0].parent_id !== null) {
        return res.status(400).json({
          message: "Replies to replies are not allowed.",
        });
      }
    }

    await pool.execute(
      `INSERT INTO comments
       (category_id,user_id,content,parent_id)
       VALUES (?,?,?,?)`,

      [categoryId, req.user.id, content, parentId || null],
    );

    res.json({ message: "Comment added" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
