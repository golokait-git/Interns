// APi calling
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "isomorphic-fetch";
export const fetchCoinById = createAsyncThunk(
  "history/fetchCoinById",
  async (sessionId) => {
    const response = await fetch(
      `/api/dashboard/plan/addcoin?sessionId=${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    
    return data;
  }
);

const History = createSlice({
  name: "history",
  initialState: {
    history_data: [],
    coin_history: [],
    coin_name: [
      "AAVEUSDT",
      "ADAUSDT",
      "ALGOUSDT",
      "ALICEUSDT",
      "ALPHAUSDT",
      "ANKRUUSDT",
      "ANTUSDT",
      "APEUSDT",
      "API3USDT",
      "APTUSDT",
      "ARPAUSDT",
      "ARUSDT",
      "ATAUSDT",
      "ATOMUSDT",
      "AUDIOUSDT",
      "AVAXUSDT",
      "AXSUSDT",
      "BAKEUSDT",
      "BALUSDT",
      "BANDUSDT",
      "BATUSDT",
      "BCHUSDT",
      "BELUSDT",
      "BLZUSDT",
      "BNBUSDT",
      "BNXUSDT",
      "BTCDOMUSDT",
      "BTCUSDT",
      "C98USDT",
      "CELOUSDT",
      "CELRUSDT",
      "CHRUSDT",
      "CHZUSDT",
      "COMPUSDT",
      "COTIUSDT",
      "CRVUSDT",
      "CTKUSDT",
      "CTSIUSDT",
      "DARUSDT",
      "DASHUSDT",
      "DEFIUSDT",
      "DENTUSDT",
      "DGBUSDT",
      "DOGEUSDT",
      "DOTUSDT",
      "DUSKUSDT",
      "DYDXUSDT",
      "EGLDUSDT",
      "ENJUSDT",
      "ENSUSDT",
      "EOSUSDT",
      "ETCUSDT",
      "ETHUSDT",
      "FILUSDT",
      "FLMUSDT",
      "FLOWUSDT",
      "FTMUSDT",
      "GALAUSDT",
      "GALUSDT",
      "GMTUSDT",
      "GRTUSDT",
      "GTCUSDT",
      "HBARUSDT",
      "HNTUSDT",
      "HOTUSDT",
      "ICPUSDT",
      "ICXUSDT",
      "IMXUSDT",
      "INJUSDT",
      "IOSTUSDT",
      "IOTAUSDT",
      "IOTXUSDT",
      "JASMYUSDT",
      "KAVAUSDT",
      "KLAYUSDT",
      "KNCUSDT",
      "KSMUSDT",
      "LINAUSDT",
      "LINKUSDT",
      "LITUSDT",
      "LPTUSDT",
      "LRCUSDT",
      "LTCUSDT",
      "LUNA2USDT",
      "MANAUSDT",
      "MASKUSDT",
      "MATICUSDT",
      "MKRUSDT",
      "MTLUSDT",
      "NEARUSDT",
      "NEOUSDT",
      "NKNUSDT",
      "OCEANUSDT",
      "OGNUSDT",
      "OMGUSDT",
      "ONEUSDT",
      "ONTUSDT",
      "OPUSDT",
      "PEOPLEUSDT",
      "QTUMUSDT",
      "REEFUSDT",
      "RENUSDT",
      "RLCUSDT",
      "ROSEUSDT",
      "RSRUSDT",
      "RUNEUSDT",
      "RVNUSDT",
      "SANDUSDT",
      "SFPUSDT",
      "SKLUSDT",
      "SNXUSDT",
      "SOLUSDT",
      "SPELLUSDT",
      "STGUSDT",
      "STMXUSDT",
      "STORJUSDT",
      "SXPUSDT",
      "THETAUSDT",
      "TOMOUSDT",
      "TRBUSDT",
      "TRXUSDT",
      "UNFIUSDT",
      "UNIUSDT",
      "VETUSDT",
      "WAVESUSDT",
      "WOOUSDT",
      "XEMUSDT",
      "XLMUSDT",
      "XMRUSDT",
      "XRPUSDT",
      "XTZUSDT",
      "ZECUSDT",
      "ZENUSDT",
      "ZILUSDT",
      "ZRXUSDT",
    ],
  },
  reducers: {
    setHistoryData(state, action) {
      state.history_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoinById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coin_history = action.payload; // Set the entire array to state.history_data
      })
      .addCase(fetchCoinById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const historyA = History.actions;

export default History;
