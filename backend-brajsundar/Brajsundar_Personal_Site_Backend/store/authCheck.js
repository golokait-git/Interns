import { createSlice } from "@reduxjs/toolkit";

const authCheck = createSlice({
  name: "authC",
  initialState: { cartIsVisibleind: 0, plan: 0 },
  reducers: {
    toggle(state, action) {
      const newcardPanel = action.payload;
      state.cartIsVisibleind = newcardPanel;
    },
    plandetails(state, action) {
      const newPlan = action.payload;
      state.plan = newPlan;
    },
  },
});

export const authCh = authCheck.actions;

export default authCheck;
