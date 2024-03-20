// APi calling
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to load data from a JSON file
export const loadDatauser = createAsyncThunk("data/loadDatauser", async() => {
    try {
        // Construct the path to the JSON file using the filename
        // const filePath = path.join(process.cwd(), "lib", `${filename}.json`);

        // // Load the file contents and parse as JSON
        // const jsonData = require(`../../lib/${filename}.json`);
        // const response = await fetch(`/api/admin/user`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        // const data = await response.json();

        // return data;
    } catch (err) {
        // Handle any errors
        const error = err;
        return error;
    }
});

const User = createSlice({
    name: "user",
    initialState: {
        user: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadDatauser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadDatauser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload; // Set the entire array to state.history_data
            })
            .addCase(loadDatauser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const user_details = User.actions;

export default User;