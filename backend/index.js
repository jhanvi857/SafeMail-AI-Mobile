// const express = require("express");
// const passport = require("passport");
// const session = require("express-session");
// const { Strategy } = require("passport-google-oauth20");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();
// const PORT = process.env.PORT || 3000;
// // const app = express();
// const router = express.Router();
// // router.use(
// //   cors({
// //     origin: [
// //       "http://localhost:8081", 
// //       "exp://192.168.1.3:19000" 
// //     ],
// //     credentials: true,
// //   })
// // );

// router.use(express.json());
// router.use(
//   session({
//     secret: "safemail_secret_key",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 24 * 60 * 60 * 1000 },
//   })
// );

// router.use(passport.initialize());
// router.use(passport.session());

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

// passport.use(
//   new Strategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BASE_URL}/auth/google/callback`, 
//     },
//     (accessToken, refreshToken, profile, done) => done(null, profile)
//   )
// );

// router.get("/", (req, res) => res.send("SafeMail Backend Running"));

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// // router.get(
// //   "/auth/google/callback",
// //   passport.authenticate("google", { failureRedirect: "/" }),
// //   (req, res) => {
// //     const email = req.user.emails[0].value;

// //     // Detect mobile via query param (add ?platform=mobile when opening Google auth in mobile)
// //     const isMobile = req.query.platform === "mobile";

// //     if (isMobile) {
// //       // Expo mobile redirect with deep link
// //       const redirectUrl = `https://auth.expo.io/@jhanvi_patel/safemail-ai?safemailDeepLink=safemail-ai://InboxScreen?email=${encodeURIComponent(email)}`;
// //       return res.redirect(redirectUrl);
// //     } else {
// //       // Web redirect (localhost dev or deployed)
// //       const redirectUrl = `http://localhost:8081/InboxScreen?email=${encodeURIComponent(email)}`;
// //       return res.redirect(redirectUrl);
// //     }
// //   }
// // );
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     const email = req.user.emails[0].value;

//     const isWeb = req.headers.origin && req.headers.origin.includes("localhost");
//     const redirectUrl = isWeb
//       ? `http://localhost:8081/InboxScreen?email=${encodeURIComponent(email)}`
//       : `safemail-ai://InboxScreen?email=${encodeURIComponent(email)}`;

//     res.redirect(redirectUrl);
//   }
// );

// router.get("/api/user", (req, res) => {
//   if (req.isAuthenticated()) res.json(req.user);
//   else res.status(401).json({ message: "Not authenticated" });
// });

// module.exports = router;
// oauthRouter.js
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { Strategy } = require("passport-google-oauth20");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

router.use(
  session({
    secret: "safemail_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
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
    (accessToken, refreshToken, profile, done) => done(null, profile)
  )
);

router.get("/", (req, res) => res.send("SafeMail OAuth running"));

router.get(
  "/auth/google",
  (req, res, next) => {
    req.session.platform = req.query.platform || "web";
    next(); 
  },
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     const email = req.user.emails[0].value;
//     const platform = req.session.platform || "web";

//     let redirectUrl;
//     if (platform === "mobile") {
//       redirectUrl = `https://auth.expo.io/@jhanvi_patel/safemail-ai?safemailDeepLink=safemail-ai://InboxScreen?email=${encodeURIComponent(email)}`;
//     } else {
//       redirectUrl = `http://localhost:8081/InboxScreen?email=${encodeURIComponent(email)}`;
//     }

//     res.redirect(redirectUrl);
//   }
// );
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const email = req.user.emails[0].value;

    const platform =
      req.session?.platform ||
      (req.headers.origin && req.headers.origin.includes("localhost")
        ? "web"
        : "mobile");

    let redirectUrl;

    if (platform === "mobile") {
      redirectUrl = `https://auth.expo.io/@jhanvi_patel/safemail-ai?safemailDeepLink=safemail-ai://InboxScreen?email=${encodeURIComponent(
        email
      )}`;
    } else {
      redirectUrl = `http://localhost:8081/InboxScreen?email=${encodeURIComponent(email)}`;
    }

    console.log("Redirecting user to:", redirectUrl);
    res.redirect(redirectUrl);
  }
);

router.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) res.json(req.user);
  else res.status(401).json({ message: "Not authenticated" });
});

module.exports = router;
