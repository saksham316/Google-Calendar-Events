import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSliceReducer } from "../modules/auth/redux/slices/authSlice";

// combining reducers
const reducers = combineReducers({
  auth: authSliceReducer,
});

// configuring store
export const store = configureStore({
  reducer: reducers,
  devTools: import.meta.env.VITE_APP_ENV === "development" ? true : false,
});
