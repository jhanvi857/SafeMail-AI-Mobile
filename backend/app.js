const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const oauthRouter = require("./index");   
const emailRouter = require("./server");  
const predictEmails = require("./emailRoutes");

app.use(cors({
  origin: ["http://localhost:8081", `exp://${process.env.IP_ADDRESS}:19000`],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));
app.use(express.json());
app.use("/", oauthRouter);
app.use("/api", emailRouter);
app.use("/predict-emails",predictEmails);
// app.get("/", (req, res) => res.send("SafeMail Backend Running"));
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); 
    res.json({ message: "Logged out successfully" });
  });
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
