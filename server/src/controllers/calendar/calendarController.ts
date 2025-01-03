// ---------------------Imports------------------------
import axios from "axios";
import { asyncErrorHandler, CustomError } from "../../utils/error";
import { createEvent } from "../../services";
import { googleOAuthClient } from "../../config/google/googleConfig";
import { authModel } from "../../models/auth/authModel";
import { fetchEvents } from "../../services/google/googleCalendar";
import { calendarModel } from "../../models/calendar/calendarModel";
import mongoose from "mongoose";
import { channel } from "diagnostics_channel";
import { channelModel } from "../../models/channel/channelModel";

// ----------------------------------------------------

// @desc - creating the calendar event
// @method - POST
// @url - /calendar/events
export const createCalendarEvent = asyncErrorHandler(async (req, res, next) => {
  const { eventName, startDate, endDate } = req.body;

  if (req.user) {
    const user = req.user as IJwtPayload;
    console.log("jwt payload create", user);

    const userData = await authModel.findById(user.userId);

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
    console.log("jwt payload", req.user);
    const channel = await channelModel.findOne({ user: user.userId });
    console.log("channel data", channel);

    if (channel) {
      const data = await calendarModel
        .find({ channelId: channel.channelId })
        .sort({ _id: -1 })
        .limit(3);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Events Data Fetched Successfully",
        data,
      });
    } else {
      res.status(404).json({
        status: 404,
        success: true,
        message: "No Event Data Found",
        data: [],
      });
    }

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
    const user = new mongoose.Types.ObjectId(String(customToken));
    if (user) {
      const userData = await authModel.findById(user);
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
          let data: Array<ICalendarCreationData> = [];
          eventRes.data.items.forEach((item) => {
            if (
              item.summary &&
              item.start?.dateTime &&
              item.end?.dateTime &&
              item.created &&
              channelId
            )
              data.push({
                eventName: item.summary,
                startDate: item.start?.dateTime,
                endDate: item.end?.dateTime,
                createdAt: item.created,
                channelId: String(channelId),
              });
          });
          if (data && data.length) {
            try {
              await calendarModel.deleteMany({});
              await calendarModel.insertMany(data);
            } catch (error) {
              console.log(
                "Error! Transaction Failed to Insert Calendar Events"
              );
            }
          }
        }

        res.status(200).json({
          status: 200,
          success: true,
          message: "Events Fetched Successfully",
        });
        return;
      }
    }
  }
});
