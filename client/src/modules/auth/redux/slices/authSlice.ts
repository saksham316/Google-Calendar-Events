import { createSlice } from "@reduxjs/toolkit";
import { googleLogin } from "../actions/authAction";
import { toast } from "react-toastify";
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
  reducers: {
    logout: (state) => {
      state.userData = {};
      state.isAuthenticated = false;
      toast.success("Logged Out Successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      // google login lifecycle actions
      .addCase(googleLogin.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        const res = action.payload as IGoogleLoginApiRes;
        if (res.success && res.data) {
          state.userData = res.data;
          state.isAuthenticated = true;
          toast.success("Logged In Successfully");
        }
        state.isAuthLoading = false;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.isAuthLoading = false;
      });
    //
  },
});

export const authSliceReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
