import { asyncErrorHandler, CustomError } from "../../utils/error";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export const verifyToken = asyncErrorHandler((req, res, next) => {
  // accessing the cookie property
  let cookie = req.cookies;

  let cookieName = process.env.COOKIE_NAME
    ? process.env.COOKIE_NAME
    : "EVENT_CALENDAR";

  // accessing the token
  let token = cookie?.[cookieName];

  // vrifiying the token
  if (process.env.JWT_SECRET) {
    if (token && token.length) {
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        (
          error: VerifyErrors | null,
          payload: JwtPayload | undefined | string
        ) => {
          if (error) {
            next(new CustomError("Unauthorized User", 401));
          } else {
            if (payload) {
              req.user = payload;
            }
            next();
          }
        }
      );
    } else {
      next(new CustomError("Unauthorized User", 401));
    }
  } else {
    next(new CustomError("Internal Server Error", 500));
  }
});
