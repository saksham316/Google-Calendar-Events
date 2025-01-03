// ---------------------Imports------------------------
import axios from "axios";
import { asyncErrorHandler, CustomError } from "../../utils/error";
import { createEvent } from "../../services";
import { googleOAuthClient } from "../../config/google/googleConfig";
import { authModel } from "../../models/auth/authModel";
import { fetchEvents } from "../../services/google/googleCalendar";
import { calendarModel } from "../../models/calendar/calendarModel";
import { backendDateFormat, formatDate } from "../../utils/date";
import moment from "moment";

// ----------------------------------------------------

// @desc - creating the calendar event
// @method - POST
// @url - /calendar/events
export const createCalendarEvent = asyncErrorHandler(async (req, res, next) => {
  const { eventName, startDate, endDate } = req.body;

  if (req.user) {
    const user = req.user as IJwtPayload;

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

    if (user && user.userId) {
      const userData = await authModel.findById(user.userId);
      if (userData && Object.keys(userData)) {
        // sync - using it for quick fetching
        const sync =
          req.query && req.query.sync && Number(req.query.sync) === 1;
        console.log("req.query", req.query);
        // setting the access and refresh token
        googleOAuthClient.setCredentials({
          access_token: userData.g_access_token,
          refresh_token: userData.g_refresh_token,
        });
        console.log(
          "momentntnsndan",
          moment(userData.presentUpdatedTime).isAfter(
            moment(userData.lastUpdatedTime)
          )
        );
        // checking whether there is any update in events or not
        if (
          sync ||
          moment(userData.presentUpdatedTime).isAfter(
            moment(userData.lastUpdatedTime)
          )
        ) {
          // updating the present and last time
          await authModel.findByIdAndUpdate(user.userId, {
            $set: {
              presentUpdatedTime: backendDateFormat(formatDate(new Date())),
              lastUpdatedTime: backendDateFormat(formatDate(new Date())),
            },
          });

          const eventRes = await fetchEvents(googleOAuthClient);
          console.log("eventRes", eventRes.data);
          if (eventRes.status === 200 && eventRes.statusText === "OK") {
            if (eventRes.data && eventRes.data.items) {
              let data: Array<ICalendarCreationData> = [];
              eventRes.data.items.forEach((item) => {
                if (
                  item.summary &&
                  item.start?.dateTime &&
                  item.end?.dateTime &&
                  item.created
                )
                  data.push({
                    eventName: item.summary,
                    startDate: item.start?.dateTime,
                    endDate: item.end?.dateTime,
                    createdAt: item.created,
                    user: user.userId,
                  });
              });

              res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Event Data Fetched Successfully",
                data,
              });
              return;
            } else {
              res.status(404).json({
                statusCode: 404,
                success: true,
                data: [],
                message: "No Data Found",
              });
              return;
            }
          } else {
            res.status(404).json({
              statusCode: 404,
              success: true,
              data: [],
              message: "No Data Found",
            });
            return;
          }
        } else {
          res.status(304).json({
            statusCode: 304,
            success: true,
            message: "Data is in sync",
          });
          return;
        }
      } else {
        next(new CustomError("Invalid User", 401));
      }
    } else {
      next(new CustomError("Invalid User", 401));
    }
  }
});

// @desc - watching the calendar events
// @method - POST
// @url - /calendar/watch-events
export const watchCalendarEvents = asyncErrorHandler(async (req, res, next) => {
  if (req.user) {
    const user = req.user as IJwtPayload;
    const userData = await authModel.findById(user.userId);
    if (userData && Object.keys(userData)) {
      // updating the db about the notification sent from notification channel
      await authModel.findByIdAndUpdate(user.userId, {
        $set: { presentUpdatedTime: backendDateFormat(formatDate(new Date())) },
      });
    } else {
      next(new CustomError("Can't Find User in DB", 404));
      return;
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Events Watched Successfully",
    });
    return;
  }
});
