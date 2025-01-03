import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createCalendarEvent,
  fetchCalendarEvents,
} from "../actions/calendarEventAction";

// initialState
const initialState: ICalendarEventInitialState = {
  isAddCalendarEventLoading: false,
  calendarEvents: [],
  isFetchCalendarEventLoading: false,
};

// authSlice
const calendarEventSlice = createSlice({
  name: "calendarEvent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create calendar event lifecycle actions
      .addCase(createCalendarEvent.pending, (state) => {
        state.isAddCalendarEventLoading = true;
      })
      .addCase(createCalendarEvent.fulfilled, (state, action) => {
        const res = action.payload as ICreateCalendarEventApiRes;
        if (res.success) {
          toast.success("Event Created Successfully");
        }
        state.isAddCalendarEventLoading = false;
      })
      .addCase(createCalendarEvent.rejected, (state, action) => {
        const res = action.payload as ICreateCalendarEventApiRes;

        toast.error(`Error! ${res.message}`);
        state.isAddCalendarEventLoading = false;
      })

      // fetch calendar events lifecycle actions
      .addCase(fetchCalendarEvents.pending, (state) => {
        state.isFetchCalendarEventLoading = true;
      })
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        const res = action.payload as IFetchCalendarEventApiRes;
        if (res.success && res.data) {
          state.calendarEvents = res.data;
        }
        state.isFetchCalendarEventLoading = false;
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        const res = action.payload as ICreateCalendarEventApiRes;
        toast.error(`Error! ${res.message}`);
        state.isFetchCalendarEventLoading = false;
      });
  },
});

export const calendarEventSliceReducer = calendarEventSlice.reducer;
