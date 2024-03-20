// APi calling
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to load data from a JSON file
export const notificationdata = createAsyncThunk("data/notificationdata", async() => {
    try {
        // dataget
        const response = await fetch(`/api/dashboard/notification/navbarnotifications`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        return data;
    } catch (err) {
        // Handle any errors
        const error = err;
        return error;
    }
});
const Notification = createSlice({
    name: "notifications",
    initialState: {
        nav_notification: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(notificationdata.pending, (state) => {
                state.status = "loading";
            })
            .addCase(notificationdata.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.nav_notification = action.payload; // Set the entire array to state.history_data
            })
            .addCase(notificationdata.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const notiFication = Notification.actions;

export default Notification;