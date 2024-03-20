import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const navBartab = createSlice({
  name: "nTab",
  initialState: { cartIsVisibleind: 0 },
  reducers: {
    toggle(state, action) {
      const newcardPanel = action.payload;

      state.cartIsVisibleind = newcardPanel;
    },
    logout(state) {
      signOut();
      router.push("/");
    },
  },
});

export const uiActions = navBartab.actions;

export default navBartab;
