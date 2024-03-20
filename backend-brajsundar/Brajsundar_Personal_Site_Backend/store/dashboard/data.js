// APi calling
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {connect} from '../../lib/db'
connect()
// Async thunk to load data from a JSON file
export const loadData = createAsyncThunk("data/loadData", async () => {
  try {
    // Construct the path to the JSON file using the filename
    // const filePath = path.join(process.cwd(), "lib", `${filename}.json`);

    // // Load the file contents and parse as JSON
    // const jsonData = require(`../../lib/${filename}.json`);
    const response = await fetch(
      `/api/dashboard/notification/notification`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (err) {
    const error = err;
    return error;
  }
});
const Data = createSlice({
  name: "data",
  initialState: {
    data_noti: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data_noti = action.payload; // Set the entire array to state.history_data
      })
      .addCase(loadData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const dataC = Data.actions;

export default Data;
