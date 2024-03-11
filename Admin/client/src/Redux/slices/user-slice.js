// user-slice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    isLoggedIn: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    removeUserData: (state, action) => {
      state.userData = {};
      state.isLoggedIn = false;
    },
  },
});

export const { setUserData, removeUserData, setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
