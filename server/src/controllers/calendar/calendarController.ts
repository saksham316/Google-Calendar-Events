// ---------------------Imports------------------------
import axios from "axios";
import { asyncErrorHandler, CustomError } from "../../utils/error";
import { createEvent } from "../../services";
import { googleOAuthClient } from "../../config/google/googleConfig";
import { authModel } from "../../models/auth/authModel";
import { fetchEvents } from "../../services/google/googleCalendar";

// ----------------------------------------------------

// @desc - creating the calendar event
// @method - POST
// @url - /calendar/events
export const createCalendarEvent = asyncErrorHandler(async (req, res, next) => {
  const { eventName, startDate, endDate } = req.body;

  if (req.user) {
    const user = req.user as IJwtPayload;
    const userData = await authModel.findById(user.userId.toString());

    if (userData && Object.keys(userData)) {
      googleOAuthClient.setCredentials({
        access_token: userData.g_access_token,
        refresh_token: userData.g_refresh_token,
      });
    } else {
      next(new CustomError("Unauthorized User", 401));
      return;
    }
  }

  if (!eventName && !startDate && !endDate) {
    next(new CustomError("Please Provide Complete Event Data", 400));
    return;
  }
  const eventRes = await createEvent(
    eventName,
    startDate,
    endDate,
    googleOAuthClient
  );

  if (eventRes.status === 200 && eventRes.statusText === "OK") {
    res.status(200).json({
      status: 200,
      success: true,
      message: "Event Created Successfully",
    });
    return;
  }
});

// @desc - fetching the calendar events
// @method - GET
// @url - /calendar/events
export const fetchCalendarEvents = asyncErrorHandler(async (req, res, next) => {
  if (req.user) {
    const user = req.user as IJwtPayload;
    const userData = await authModel.findById(user.userId.toString());

    if (userData && Object.keys(userData)) {
      googleOAuthClient.setCredentials({
        access_token: userData.g_access_token,
        refresh_token: userData.g_refresh_token,
      });
    } else {
      next(new CustomError("Unauthorized User", 401));
      return;
    }
  }

  const eventRes = await fetchEvents(googleOAuthClient);

  if (eventRes.status === 200 && eventRes.statusText === "OK") {
    res.status(200).json({
      status: 200,
      success: true,
      message: "Event Fetched Successfully",
      data: eventRes.data,
    });
    return;
  }
});

// @desc - watching the calendar events
// @method - POST
// @url - /calendar/watch-events
export const watchCalendarEvents = asyncErrorHandler((req, res, next) => {
  const customToken = req.headers["x-goog-channel-token"];
  console.log("customToken", customToken);
  if (!customToken) {
    next(new CustomError("Unauthorized request", 401));
    return;
  }

  console.log("res", res);
});
