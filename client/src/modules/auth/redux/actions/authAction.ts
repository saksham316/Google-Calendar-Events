import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../services/axios/axios";

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/google-login", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
