import { asyncErrorHandler, CustomError } from "../../utils/error";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export const verifyGoogleToken = asyncErrorHandler((req, res, next) => {
  const channelToken = req.headers["x-goog-channel-token"];
  const resourceId = req.headers["x-goog-resource-id"];
  const channelId = req.headers["x-goog-channel-id"];

  // checking the tokens sent to us from incoming google req
  if (!channelToken) {
    next(new CustomError("Channel Token Not Provided", 403));
    return;
  } else {
    // verifiying the token
    if (process.env.GOOGLE_NOTIFICATION_CHANNEL_SECRET) {
      if (
        channelToken &&
        typeof channelToken === "string" &&
        channelToken.length
      ) {
        jwt.verify(
          channelToken,
          process.env.GOOGLE_NOTIFICATION_CHANNEL_SECRET,
          (
            error: VerifyErrors | null,
            payload: JwtPayload | undefined | string
          ) => {
            if (error) {
              next(new CustomError("Invalid Channel Token", 403));
            } else {
              if (payload) {
                req.user = payload;
              }
              next();
            }
          }
        );
      } else {
        next(new CustomError("Invalid Channel Token Type", 401));
      }
    } else {
      next(new CustomError("Internal Server Error", 500));
    }
  }
});
