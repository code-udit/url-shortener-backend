const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { encodeBase62 } = require("../services/shortCodeService");

router.post("/shorten", async (req, res) => {
  try {
    const { url, customCode } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    let shortCode;

    // 🔥 If user provides custom short code
    if (customCode && customCode.trim() !== "") {
      // Check if already exists
      const existing = await pool.query(
        "SELECT id FROM urls WHERE short_code = $1",
        [customCode]
      );

      if (existing.rows.length > 0) {
        return res.status(400).json({ error: "Custom code already taken" });
      }

      shortCode = customCode;

      await pool.query(
        "INSERT INTO urls (original_url, short_code) VALUES ($1, $2)",
        [url, shortCode]
      );

    } else {
      // Auto-generate Base62
      const result = await pool.query(
        "INSERT INTO urls (original_url) VALUES ($1) RETURNING id",
        [url]
      );

      const id = result.rows[0].id;
      shortCode = encodeBase62(id);

      await pool.query(
        "UPDATE urls SET short_code = $1 WHERE id = $2",
        [shortCode, id]
      );
    }

    res.json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      "SELECT original_url FROM urls WHERE short_code = $1",
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "URL not found" });
    }

    const originalUrl = result.rows[0].original_url;

    return res.redirect(originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* ✅ ANALYTICS ROUTE */
router.get("/analytics/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const result = await pool.query(
      "SELECT original_url, clicks, created_at FROM urls WHERE short_code = $1",
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;