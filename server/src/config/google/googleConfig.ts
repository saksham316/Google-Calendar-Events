import { google } from "googleapis";

const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

export const googleOAuthClient = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  "postmessage"
);
