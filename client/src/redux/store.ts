import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSliceReducer } from "../modules/auth/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { calendarEventSliceReducer } from "../modules/calendar/redux/slices/calendarEventSlice";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// combining reducers
const reducers = combineReducers({
  auth: authSliceReducer,
  calendarEvent: calendarEventSliceReducer,
});

// persistConfig -- redux-persist configuration
const persistConfig = {
  key: "calendar-data",
  version: 1,
  storage: localStorage,
};

//persistedReducer -- this ensures that whenever redux state changes we store it in the persisted storage
const persistedReducer = persistReducer(persistConfig, reducers);

// configuring store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_APP_ENV === "development" ? true : false,
});

export const persistor = persistStore(store);

type AppSelector = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppSelector>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
