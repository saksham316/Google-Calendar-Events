import { google } from "googleapis";
import { googleOAuthClient } from "../../config/google/googleConfig";
import { v4 as uuidv4 } from "uuid";

// createEvent - service to create the event in the google calendar
export const createEvent = async (
  eventName: string,
  startTime: string,
  endTime: string,
  auth: typeof googleOAuthClient
) => {
  try {
    // calendar - authenticating google calendar and getting the google calendar object
    const calendar = google.calendar({
      version: "v3",
      auth: auth,
    });

    // event - event to be created
    const event = {
      summary: eventName,
      start: { dateTime: startTime, timeZone: "UTC" },
      end: { dateTime: endTime, timeZone: "UTC" },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        start: event.start,
        end: event.end,
        summary: event.summary,
      },
      auth,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

// fetchEvents - service to fetch the events in the google calendar
export const fetchEvents = async (auth: typeof googleOAuthClient) => {
  try {
    // calendar - authenticating google calendar and getting the google calendar object
    const calendar = google.calendar({
      version: "v3",
      auth: auth,
    });

    const response = await calendar.events.list({
      calendarId: "primary",
      maxResults: 10,
      timeMin: new Date().toISOString(),
      auth,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

// watchEvents - service to register the notification channel
export const watchEvents = async (
  auth: typeof googleOAuthClient,
  webHookUrl: string,
  customToken: string
) => {
  try {
    // calendar - authenticating google calendar and getting the google calendar object
    const calendar = google.calendar({
      version: "v3",
      auth: auth,
    });

    // registering the notification channel with unique id using uuid
    const response = await calendar.events.watch({
      calendarId: "primary",
      requestBody: {
        id: uuidv4(),
        type: "web_hook",
        address: webHookUrl,
        ...(customToken && { token: customToken }),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
