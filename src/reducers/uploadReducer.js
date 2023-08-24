import { createSlice } from "@reduxjs/toolkit";

const uploadReducer = createSlice({
  name: "upload",
  initialState: {
    isVisible: false,
    files: [],
  },
  reducers: {
    showUploader: (state) => {
      return { ...state, isVisible: true };
    },
    hideUploader: (state) => {
      return { ...state, isVisible: false };
    },
    addUploadFile: (state, action) => {
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    },
    removeUploadFile: (state, action) => {
      return {
        ...state,
        files: [...state.files.filter((file) => file.id !== action.payload)],
      };
    },
    changeUploadFile: (state, action) => {
      return {
        ...state,
        files: state.files.map((file) =>
          file.id === action.payload.id
            ? { ...file, progress: action.payload.progress }
            : file
        ),
      };
    },
  },
});

export const {
  showUploader,
  hideUploader,
  addUploadFile,
  removeUploadFile,
  changeUploadFile,
} = uploadReducer.actions;

export default uploadReducer.reducer;
