const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const { Strategy } = require("passport-google-oauth20");
const dotenv = require("dotenv");
dotenv.config();
// const app = express();
// router.use(express.json());
// router.use(cors());
const router = express.Router();
router.post("/analyze-email", async (req, res) => {
  try {
    const { emailText } = req.body;

    if (!emailText || emailText.trim() === "") {
      return res.status(400).json({ error: "Email text is required" });
    }

    const response = await fetch(`${process.env.IP_ADDRESS}:5000/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailText }),
    });

    const data = await response.json();

    if (data.error) return res.status(500).json(data);

    res.json({
      message: "Email classified successfully",
      result: data.label, 
      confidence: data.prediction,
    });
  } catch (err) {
    res.status(500).json({ error: "Error connecting to ML service", details: err.message });
  }
});
module.exports = router;