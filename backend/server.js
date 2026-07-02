require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/authRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const voteRoutes = require("./src/routes/voteRoutes");
const resultRoutes = require("./src/routes/resultRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const leaderboardRoutes = require("./src/routes/leaderboardRoutes");

const app = express();

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
