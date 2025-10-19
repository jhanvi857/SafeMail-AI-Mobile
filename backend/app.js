const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const oauthRouter = require("./index");   
const emailRouter = require("./server");  

app.use(cors({
  origin: ["http://localhost:8081", "exp://192.168.1.3:19000"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));
app.use(express.json());
app.use("/auth", oauthRouter);
app.use("/api", emailRouter);

app.get("/", (req, res) => res.send("SafeMail Backend Running"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
