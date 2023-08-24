import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import uploadReducer from "./uploadReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
  },
  middleware: [thunk],
});

export default store;
