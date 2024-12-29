import { createSlice } from "@reduxjs/toolkit";
import { googleLogin } from "../actions/authAction";

// initialState
const initialState = {
  isAuthenticated: false,
  userData: {},
  isAuthLoading: false,
};

// authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // google login lifecycle actions
      .addCase(googleLogin.pending, (state, action) => {
        state.isAuthLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthLoading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isAuthLoading = false;
      });
  },
});

export const authSliceReducer = authSlice.reducer;
