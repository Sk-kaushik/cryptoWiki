import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: null,
  loading: false,
};

const coinsUrl = `https://coinranking1.p.rapidapi.com/coins?limit=`;
const coinDetailUrl = `https://coinranking1.p.rapidapi.com/coin/`;

export const getCoinsData = createAsyncThunk("/getStatsData", async ({ count, coinId = -1 }) => {
  const completeUrl = coinId > 0 ? coinDetailUrl + coinId : coinsUrl + count;

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

const getCoinsSlice = createSlice({
  name: "coinsSlice",
  initialState,

  extraReducers: {
    [getCoinsData.pending]: (state) => {
      state.status = "pending";
      state.loading = true;
    },
    [getCoinsData.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.data = payload;
      state.loading = false;
    },
    [getCoinsData.rejected]: (state) => {
      state.status = "rejected";
      state.loading = false;
    },
  },
});

// export const { dataSlice } = getDataSlice.actions;
export default getCoinsSlice.reducer;
