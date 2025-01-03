// ----------------Imports----------------
import { Router } from "express";
import {
  createCalendarEvent,
  fetchCalendarEvents,
  watchCalendarEvents,
} from "../../controllers/calendar/calendarController";
import { verifyToken } from "../../middlewares/auth/verifyToken";
import { verifyGoogleToken } from "../../middlewares/google/verifyGoogleToken";

// ----------------------------------------
const calendarRouter = Router();
// ----------------------------------------
// calendar/events
calendarRouter
  .route("/events")
  .post(verifyToken, createCalendarEvent)
  .get(verifyToken, fetchCalendarEvents);

// calendar/watch-events
calendarRouter
  .route("/watch-events")
  .post(verifyGoogleToken, watchCalendarEvents);

// ----------------------------------------
export { calendarRouter };
