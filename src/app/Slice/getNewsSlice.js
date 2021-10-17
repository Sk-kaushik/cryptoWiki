import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  newsArray: null,
  loading: false,
  status: null,
};

export const getNews = createAsyncThunk("/getNews", async ({ newsCategory, count }) => {
  return fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`, {
    method: "GET",
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    },
  }).then((response) => {
    return response.json();
  });
});

const getNewsSlice = createSlice({
  name: "news slice",
  initialState,
  extraReducers: {
    [getNews.pending]: (state) => {
      state.status = "pending";
      state.loading = true;
    },
    [getNews.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.loading = false;
      state.newsArray = payload;
    },
    [getNews.rejected]: (state) => {
      state.status = "rejected";
      state.loading = false;
    },
  },
});

export default getNewsSlice.reducer;
