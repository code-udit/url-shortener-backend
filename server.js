const express = require("express");
require("dotenv").config();
const pool = require("./src/config/db");
const cors = require("cors");

const urlRoutes = require("./src/routes/urlRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));

// Middleware
app.use(express.json());
app.use(express.static("public")); // This serves frontend files
app.use("/api", urlRoutes);

// Home route (optional)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Redirect route
app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const result = await pool.query(
      "SELECT original_url FROM urls WHERE short_code = $1",
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "URL not found" });
    }

    await pool.query(
      "UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1",
      [shortCode]
    );

    const originalUrl = result.rows[0].original_url;

    res.redirect(originalUrl);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});