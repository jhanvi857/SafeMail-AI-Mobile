const express = require("express");
const { fetchEmailsAndPredict, setTokens } = require("./emailController");

const router = express.Router();

router.post("/set-tokens", (req, res) => {
  const { tokens } = req.body;
  if (!tokens) return res.status(400).json({ error: "No tokens provided" });
  setTokens(tokens);
  res.json({ message: "Tokens saved" });
});

router.get("/emails", async (req, res) => {
  try {
    const emails = await fetchEmailsAndPredict(req);
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
