import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import exchangeRateReducer from "pages/ExchangeRate/exchangeRateSlice";
import topBarReducer from "components/TopBar/topBarSlice";

const reducers = combineReducers({
  exchangeRate: exchangeRateReducer,
  topBar: topBarReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
