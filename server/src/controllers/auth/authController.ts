// ---------------------Imports------------------------
import axios from "axios";
import { googleOAuthClient } from "../../config/google/googleConfig";
import { asyncErrorHandler, CustomError } from "../../utils/error";
import { authModel } from "../../models/auth/authModel";
import { createJwtToken } from "../../utils/jwt";
import { saveTokenToCookie } from "../../utils/cookie";
import { watchEvents } from "../../services/google/googleCalendar";
import { v4 as uuidv4 } from "uuid";
import { backendDateFormat, formatDate } from "../../utils/date";

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
        lastUpdatedTime: backendDateFormat(formatDate(new Date())),
        presentUpdatedTime: backendDateFormat(formatDate(new Date())),
      };

      const user = await authModel.findOne({ email: userInfo.email });
      let userId: string = "";

      if (!user || !Object.keys(user).length) {
        const authUser = new authModel(userInfo);
        const user = await authUser.save();
        userId = user._id.toString();
      } else {
        await authModel.findOneAndUpdate(
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
      const customToken = createJwtToken(
        { userId },
        process.env.GOOGLE_NOTIFICATION_CHANNEL_SECRET,
        "30d"
      );
      // channel id must be unique
      const uniqueId = uuidv4();

      // registering the calendar event notification channel
      const eventsNotificationChannel = await watchEvents(
        googleOAuthClient,
        `${process.env.NODE_PRODUCTION_URL}/api/v1/calendar/watch-events`,
        customToken,
        uniqueId
      );

      let eventsNotificationChannelConnection = false;

      if (
        eventsNotificationChannel.status === 200 &&
        eventsNotificationChannel.statusText === "OK"
      ) {
        eventsNotificationChannelConnection = true;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: `User Authenticated Successfully ${
          eventsNotificationChannelConnection
            ? "and Calendar Notification Channel Connected"
            : ""
        }`,
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
