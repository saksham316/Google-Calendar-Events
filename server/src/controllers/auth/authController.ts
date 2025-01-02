// ---------------------Imports------------------------
import axios from "axios";
import { googleOAuthClient } from "../../config/google/googleConfig";
import { asyncErrorHandler, CustomError } from "../../utils/error";
import { authModel } from "../../models/auth/authModel";
import { createJwtToken } from "../../utils/jwt";
import { saveTokenToCookie } from "../../utils/cookie";
import { watchEvents } from "../../services/google/googleCalendar";

// ----------------------------------------------------

// @desc - login through google oauth2
// @method - POST
// @url - /auth/google-login
export const googleLogin = asyncErrorHandler(async (req, res, next) => {
  const { authCode } = req.body;

  // if google auth code is not present then can't move ahead
  if (!authCode) {
    const error = new CustomError("Authentication Code is required", 400);
    next(error);
    return;
  }

  // fetching the access token from the google api
  const googleRes = await googleOAuthClient.getToken(authCode);

  // checking the api response
  if (googleRes.res?.statusText === "OK" && googleRes.res?.status === 200) {
    const { tokens } = googleRes;

    // setting the google credentials(tokens) for further usage
    googleOAuthClient.setCredentials(tokens);

    // fetching the user information
    const userInfoRes = await axios.get(
      `${process.env.GOOGLE_OAUTH_USER_INFO_API_URL}${tokens.access_token}`
    );

    // checking the userinfo api response
    if (userInfoRes?.statusText === "OK" && userInfoRes?.status === 200) {
      const { email, name, picture } = userInfoRes.data;

      const userInfo = {
        email,
        name,
        avatar: picture,
        g_refresh_token: tokens.refresh_token,
        g_access_token: tokens.access_token,
      };

      const user = await authModel.findOne({ email: userInfo.email });
      let userId: string = "";

      if (!user || !Object.keys(user).length) {
        const authUser = new authModel(userInfo);
        const user = await authUser.save();
        userId = user._id.toString();
      } else {
        await authModel.findOne(
          { email: userInfo.email },
          {
            $set: {
              g_access_token: tokens.access_token,
              g_refresh_token: tokens.refresh_token,
            },
          }
        );
        userId = user._id.toString();
      }

      // generating token for session creation
      const jwtToken = createJwtToken({ userId });

      // saving the token to cookie
      saveTokenToCookie(res, jwtToken);

      // custom token for validating the notification channel request
      const customToken = process.env.GOOGLE_NOTIFICATION_CHANNEL_TOKEN
        ? process.env.GOOGLE_NOTIFICATION_CHANNEL_TOKEN
        : "";

      // registering the calendar event notification channel
      const eventsNotificationChannel = await watchEvents(
        googleOAuthClient,
        `${process.env.NODE_PRODUCTION_URL}/api/v1/calendar/watch-events`,
        customToken
      );
      console.log("eventsNotificationChannel", eventsNotificationChannel);

      res.status(200).json({
        status: 200,
        success: true,
        message: "User Authenticated Successfully",
        data: userInfo,
      });
      return;
    } else {
      next(new CustomError("User Data Not Found", 404));
    }
  } else {
    next(new CustomError("Unable to Authenticate User", 400));
  }
});
