import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./page.js";

export const store = configureStore({
  reducer: {
    page: pageReducer,
  },
});
