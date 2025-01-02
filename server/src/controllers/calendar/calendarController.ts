// ---------------------Imports------------------------
import axios from "axios";
import { asyncErrorHandler, CustomError } from "../../utils/error";
import { createEvent } from "../../services";
import { googleOAuthClient } from "../../config/google/googleConfig";
import { authModel } from "../../models/auth/authModel";
import { fetchEvents } from "../../services/google/googleCalendar";
import { calendarModel } from "../../models/calendar/calendarModel";

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
    const data = await calendarModel
      .find({ _id: user.userId.toString() })
      .sort({ createdAt: -1 })
      .limit(3);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Events Data Fetched Successfully",
      data,
    });
    return;
  } else {
    next(new CustomError("Invalid User", 4001));
  }
});

// @desc - watching the calendar events
// @method - POST
// @url - /calendar/watch-events
export const watchCalendarEvents = asyncErrorHandler(async (req, res, next) => {
  const customToken = req.headers["x-goog-channel-token"];
  const resourceId = req.headers["x-goog-resource-id"];
  const channelId = req.headers["x-goog-channel-id"];

  if (!customToken && !resourceId && !channelId) {
    next(new CustomError("Unauthorized request", 401));
    return;
  } else {
    const user = channelId;
    if (user) {
      const userData = await authModel.findById(user.toString());
      if (userData && Object.keys(userData)) {
        googleOAuthClient.setCredentials({
          access_token: userData.g_access_token,
          refresh_token: userData.g_refresh_token,
        });
      } else {
        next(new CustomError("Unauthorized User", 401));
        return;
      }
      //
      const eventRes = await fetchEvents(googleOAuthClient);
      if (eventRes.status === 200 && eventRes.statusText === "OK") {
        if (eventRes.data && eventRes.data.items) {
          let data = eventRes.data.items.map((item) => {
            return {
              eventName: item.summary,
              startDate: item.start?.date,
              endDate: item.end?.date,
              createdAt: item.created,
              user: channelId.toString(),
            };
          });
          if (data && data.length) {
            await calendarModel.insertMany(data);
          }
        }

        res.status(200).json({
          status: 200,
          success: true,
          message: "Event Fetched Successfully",
        });
        return;
      }
    }
  }
});
