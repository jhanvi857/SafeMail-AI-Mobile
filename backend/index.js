const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { Strategy } = require("passport-google-oauth20");
const dotenv = require("dotenv");
dotenv.config();

// Decide URL..
const router = express.Router();
const isProd = process.env.NODE_ENV === "production";
const LOCALHOST_WEB = "http://localhost:8081"; 
const MOBILE_DEEP_LINK = "safemail-ai://InboxScreen"; 
const BACKEND_BASE = isProd ? process.env.BASE_URL : "http://localhost:3000";


router.use(
  session({
    secret: "safemail_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    },
  })
);

router.use(passport.initialize());
router.use(passport.session());

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
      profile.tokens = { accessToken, refreshToken };
      done(null, profile);
    }
  )
);

router.get("/", (req, res) => res.send("SafeMail OAuth running"));

// gmail verification
router.get(
  "/auth/google",
  (req, res, next) => {
    req.session.platform = req.query.platform || "web"; 
    next();
  },
  passport.authenticate("google", {
    scope: [
      "email",
      "profile",
      "https://www.googleapis.com/auth/gmail.readonly", 
    ],
    accessType: "offline", 
    prompt: "consent", 
  })
);

// gmail callback..
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const email = req.user.emails[0].value;
    const platform = req.session.platform || "web";

    let redirectUrl;
    if (platform === "mobile") {
      redirectUrl = `https://safe-mail-ai-mobile.vercel.app/InboxScreen?email=${encodeURIComponent(email)}`;
    } else {
      redirectUrl = `https://safe-mail-ai-mobile.vercel.app/InboxScreen?email=${encodeURIComponent(email)}`;
    }

    console.log("Redirecting user to:", redirectUrl);
    res.redirect(redirectUrl);
  }
);

// Demo route..
router.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) res.json(req.user);
  else res.status(401).json({ message: "Not authenticated" });
});

// Logout route..
router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
