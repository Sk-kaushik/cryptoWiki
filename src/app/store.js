import { configureStore } from "@reduxjs/toolkit";
import getCoinsHistorySlice from "./Slice/getCoinHistory";
import getCoinSlice from "./Slice/getCoinSlice";
import getNewsSlice from "./Slice/getNewsSlice";
import getExchangeSlice from "./Slice/getExchangeSlice";

export default configureStore({
  reducer: {
    getCoinsReducer: getCoinSlice,
    getCoinHistoryReducer: getCoinsHistorySlice,
    getExchangeReducer: getExchangeSlice,
    getNewsReducer: getNewsSlice,
  },
});
