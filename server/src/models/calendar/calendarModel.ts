import mongoose from "mongoose";

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
});

export const authModel = mongoose.model("calendar", calendarSchema, "calendar");
