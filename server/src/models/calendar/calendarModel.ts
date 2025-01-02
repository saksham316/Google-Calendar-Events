import mongoose from "mongoose";
import { authModel } from "../auth/authModel";

const calendarSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "Event Name is a required field"],
  },
  startTime: {
    type: String,
    required: [true, "Start Time is a required field"],
  },
  endTime: {
    type: String,
    required: [true, "End Time is a required field"],
  },
  createdAt: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
});

export const calendarModel = mongoose.model(
  "calendar",
  calendarSchema,
  "calendar"
);
