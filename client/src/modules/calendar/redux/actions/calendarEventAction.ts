import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../services/axios/axios";

export const createCalendarEvent = createAsyncThunk(
  "calendarEvent/createCalendarEvent",
  async (payload: ICreateCalendarEventPayload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/calendar/events", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// fetchCalendarEvents
export const fetchCalendarEvents = createAsyncThunk(
  "calendarEvent/fetchCalendarEvents",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/calendar/events", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
