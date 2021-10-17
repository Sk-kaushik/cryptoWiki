import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: null,
  loading: false,
};

export const getExchange = createAsyncThunk("/getExchange", async () => {
  return fetch(`https://coinranking1.p.rapidapi.com/exchanges/`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    },
  }).then((res) => {
    return res.json();
  });
});

const getExchangeSlice = createSlice({
  name: "exchangeSlice",
  initialState,
  extraReducers: {
    [getExchange.pending]: (state) => {
      state.status = "pending";
      state.loading = true;
    },
    [getExchange.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.status = "fulfilled";
      state.loading = false;
    },
    [getExchange.pending]: (state) => {
      state.status = "rejected";
      state.loading = false;
    },
  },
});

export default getExchangeSlice.reducer;
