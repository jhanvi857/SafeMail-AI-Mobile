const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { Strategy } = require("passport-google-oauth20");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [`http://localhost:8081/LoginScreen`], 
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "safemail_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.get("/", (req, res) => res.send("SafeMail Backend Running"));

// Start OAuth
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// // OAuth callback
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     // Send deep link to Expo app
//     const email = req.user.emails[0].value;
//     const redirectUrl = `safemailai://InboxScreen?email=${encodeURIComponent(email)}`;
//     res.redirect(redirectUrl);
//   }
// );
// Start OAuth flow (must include scope)
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Callback route (do NOT include scope here)
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const email = req.user.emails[0].value;
    res.redirect(`http://localhost:8081/InboxScreen?email=${encodeURIComponent(email)}`);
  }
);

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) res.json(req.user);
  else res.status(401).json({ message: "Not authenticated" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:3000`));
