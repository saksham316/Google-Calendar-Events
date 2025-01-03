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
export const fetchCalendarEvents = createAsyncThunk<
  IFetchCalendarEventApiRes,
  { query?: string } | void
>("calendarEvent/fetchCalendarEvents", async (payload, { rejectWithValue }) => {
  try {
    console.log("payload", payload);
    const res = await axiosInstance.get(
      `/calendar/events${payload && payload.query ? `?${payload.query}` : ""}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        params: payload,
      }
    );
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
