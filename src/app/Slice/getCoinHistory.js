import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initiallState = {
  data: null,
  status: null,
  loading: false,
};

const coinHistoryUrl = `https://coinranking1.p.rapidapi.com/coin/`;

export const getCoinsHistory = createAsyncThunk("/getCoinsHistory", async ({ coinId, timePeriod }) => {
  const completeUrl = coinHistoryUrl + coinId + "/history/" + timePeriod;

  return fetch(completeUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    },
  }).then((res) => {
    return res.json();
  });
});

const getCoinsHistorySlice = createSlice({
  name: "coinHistorySlice",
  initialState: initiallState,

  extraReducers: {
    [getCoinsHistory.pending]: (state) => {
      state.status = "pending";
      state.loading = true;
    },
    [getCoinsHistory.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.data = payload;
      state.loading = false;
    },
    [getCoinsHistory.rejected]: (state) => {
      state.status = "rejected";
      state.loading = false;
    },
  },
});

export default getCoinsHistorySlice.reducer;
