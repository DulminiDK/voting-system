const express = require("express");

const router = express.Router();

const pool = require("../db");

const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");

/* ADD NOMINEE */

router.post(
  "/nominees",

  requireAuth,
  requireAdmin,

  async (req, res) => {
    const { categoryId, name, country } = req.body;

    await pool.execute(
      `INSERT INTO nominees
(category_id,name,country)
VALUES (?,?,?)`,

      [categoryId, name, country],
    );

    res.json({ message: "Nominee added" });
  },
);

/* DELETE NOMINEE */

router.delete(
  "/nominees/:id",

  requireAuth,
  requireAdmin,

  async (req, res) => {
    await pool.execute(
      "DELETE FROM nominees WHERE id=?",

      [req.params.id],
    );

    res.json({ message: "Deleted" });
  },
);

/* DELETE COMMENT */

router.delete(
  "/comments/:id",

  requireAuth,
  requireAdmin,

  async (req, res) => {
    await pool.execute(
      "DELETE FROM comments WHERE id=?",

      [req.params.id],
    );

    res.json({ message: "Comment deleted" });
  },
);

/* GET ALL NOMINEES */

router.get("/nominees", requireAuth, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT n.id,
                n.name,
                n.country,
                c.title as category

         FROM nominees n
         JOIN categories c
         ON n.category_id = c.id

         ORDER BY n.id DESC`,
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
