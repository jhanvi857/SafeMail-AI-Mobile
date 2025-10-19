// const express = require("express");
// const fetch = require("node-fetch"); 
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.post("/api/analyze-email", async (req, res) => {
//   try {
//     const { emailText } = req.body;

//     if (!emailText || emailText.trim() === "")
//       return res.status(400).json({ error: "Email text is required" });

//     const response = await fetch("http://127.0.0.1:5000/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: emailText }),
//     });

//     const data = await response.json();

//     if (data.error) return res.status(500).json(data);

//     res.json({
//       message: "Email classified successfully",
//       result: data.label, 
//       confidence: data.prediction,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error connecting to ML service", details: error.message });
//   }
// });

// app.listen(3000, () => console.log("Node backend running on port 3000"));

// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/analyze-email", async (req, res) => {
  try {
    const { emailText } = req.body;

    if (!emailText || emailText.trim() === "") {
      return res.status(400).json({ error: "Email text is required" });
    }

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailText }),
    });

    const data = await response.json();

    if (data.error) return res.status(500).json(data);

    res.json({
      message: "Email classified successfully",
      result: data.label, // safe / fraudulent
      confidence: data.prediction,
    });
  } catch (err) {
    res.status(500).json({ error: "Error connecting to ML service", details: err.message });
  }
});

app.listen(3000, () => console.log("Node backend running on port 3000"));
