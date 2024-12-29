// ---------------------Imports------------------------
import axios from "axios";
import { googleOAuthClient } from "../../config/google/googleConfig";
import { asyncErrorHandler, CustomError } from "../../utils/error";

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
    googleOAuthClient.setCredentials(tokens);

    const userInfoRes = await axios.get(
      `${process.env.GOOGLE_OAUTH_USER_INFO_API_URL}${tokens.access_token}`
    );
    const { email, name, picture } = userInfoRes.data;

    const userInfo = {
      email,
      name,
      avatar: picture,
    };

    res.status(200).json({
      status: 200,
      success: true,
      message: "User Authenticated Successfully",
      data: userInfo,
    });
    return;
  } else {
    new CustomError("Unable to Authenticate User", 400);
  }
});
