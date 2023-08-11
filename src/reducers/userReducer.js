import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isAuth: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuth = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
