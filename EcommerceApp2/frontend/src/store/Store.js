import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// console.log("UserSlice: " + JSON.stringify(userReducer));

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
