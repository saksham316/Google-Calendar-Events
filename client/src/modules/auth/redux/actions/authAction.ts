import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../services/axios/axios";
import { AxiosResponse } from "axios";
import { persistor } from "../../../../redux/store";

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
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//logout

export const purgeStore = async () => {
  return await persistor.purge();
};
