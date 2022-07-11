import { configureStore } from "@reduxjs/toolkit";
import userReducer from './_user';

export default configureStore({
  reducer: {
    userReducer,
  },
});