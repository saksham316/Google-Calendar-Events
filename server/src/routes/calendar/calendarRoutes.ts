// ----------------Imports----------------
import { Router } from "express";
import {
  createCalendarEvent,
  fetchCalendarEvents,
} from "../../controllers/calendar/calendarController";
import { verifyToken } from "../../middlewares/auth/verifyToken";

// ----------------------------------------
const calendarRouter = Router();

// attaching the verifyToken middleware to all the requests
calendarRouter.use(verifyToken);

// ----------------------------------------
// calendar/events
calendarRouter
  .route("/events")
  .post(createCalendarEvent)
  .get(fetchCalendarEvents);

// ----------------------------------------
export { calendarRouter };
