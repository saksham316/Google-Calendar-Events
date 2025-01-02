import { Response } from "express";
import { nodeEnv } from ".";

// cookieValidity -- function which returns the cookie expiry time
const cookieValidity = () => {
  let currentDate = new Date();
  return new Date(currentDate.getTime() + 12 * 60 * 60 * 1000);
};

//saveAccessTokenToCookie -- function used to set the token to the cookie
export const saveTokenToCookie = (res: Response, token: string) => {
  const cookieName = process.env.COOKIE_NAME
    ? process.env.COOKIE_NAME
    : "EVENT_CALENDAR";
  return res.cookie(cookieName, token, {
    httpOnly: true,
    expires: cookieValidity(),
    ...(nodeEnv === "prod"
      ? { sameSite: "lax" }
      : { sameSite: "none", secure: true }),
  });
};
