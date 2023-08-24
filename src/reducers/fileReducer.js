import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    currentDir: null,
    popupDisplay: "none",
    dirStack: [],
  },
  reducers: {
    setFiles: (state, action) => {
      return { ...state, files: action.payload };
    },
    setCurrentDir: (state, action) => {
      return { ...state, currentDir: action.payload };
    },
    addFile: (state, action) => {
      return { ...state, files: [...state.files, action.payload] };
    },
    setPopupDisplay: (state, action) => {
      return { ...state, popupDisplay: action.payload };
    },
    pushDirStack: (state, action) => {
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    },
    exchangeDirStack: (state, action) => {
      return { ...state, dirStack: [action.payload] };
    },
    deleteFileAction: (state, action) => {
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      };
    },
  },
});

export const {
  setFiles,
  setCurrentDir,
  addFile,
  setPopupDisplay,
  pushDirStack,
  exchangeDirStack,
  deleteFileAction,
} = fileSlice.actions;
export default fileSlice.reducer;
