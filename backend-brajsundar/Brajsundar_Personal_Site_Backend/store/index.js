import { configureStore } from "@reduxjs/toolkit";

import navBartab from "./navbar";
import authCheck from "./authCheck";
import smallCom from "./admin/smallcom";
import History from "./dashboard/history";
import Data from "./dashboard/data";
import Notification from "./dashboard/notification";

import User from "./admin/user";
const store = configureStore({
  reducer: {
    nTab: navBartab.reducer,
    authCheck: authCheck.reducer,
    smC: smallCom.reducer,
    history: History.reducer,
    Data: Data.reducer,
    notifications: Notification.reducer,
    User: User.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
