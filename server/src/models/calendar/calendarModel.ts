import mongoose from "mongoose";
import { authModel } from "../auth/authModel";

const calendarSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "Event Name is a required field"],
  },
  startDate: {
    type: String,
    required: [true, "Start Time is a required field"],
  },
  endDate: {
    type: String,
    required: [true, "End Time is a required field"],
  },
  createdAt: {
    type: String,
  },
  channelId: {
    type: String,
    required: [true, "Channel Id is a required field"],
  },
});

export const calendarModel = mongoose.model(
  "calendar",
  calendarSchema,
  "calendar"
);
