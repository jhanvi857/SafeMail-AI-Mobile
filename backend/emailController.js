const { google } = require("googleapis");
const fetch = require("node-fetch");

let userTokens = null;
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const setTokens = (tokens) => { userTokens = tokens; };
const getTokens = () => userTokens;

const fetchEmailsAndPredict = async (req) => {
  let tokens = req.user?.tokens;

  if (!tokens && userTokens) tokens = userTokens;

  if (!tokens?.accessToken) throw new Error("User not logged in or missing tokens");

  oauth2Client.setCredentials({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const listRes = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
    q: "is:unread",
  });
  const messages = listRes.data.messages || [];

  const results = [];

  for (const m of messages) {
    const msg = await gmail.users.messages.get({
      userId: "me",
      id: m.id,
      format: "full",
    });

    const payload = msg.data.payload;

    const getBody = (part) => {
      if (!part) return "";
      if (part.body?.data) return Buffer.from(part.body.data, "base64").toString("utf8");
      if (part.parts) return part.parts.map(getBody).join("\n");
      return "";
    };

    const emailText = getBody(payload) || msg.data.snippet || "";

    const mlResp = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailText }),
    });
    const mlData = await mlResp.json();

    results.push({
      id: m.id,
      from: payload.headers.find(h => h.name === "From")?.value || "(no sender)",
      subject: payload.headers.find(h => h.name === "Subject")?.value || "(no subject)",
      ml: mlData,
      status: mlData.label,
    });
  }

  return results;
};


module.exports = { fetchEmailsAndPredict, setTokens, getTokens };