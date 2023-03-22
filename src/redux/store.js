import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import counterReducer from "../ReduxTest/counterSlice";
import stateReducer from "../ReduxTest2/stateSlice";
import exchangeRateReducer from "../ExchangeRate/stateSlice";
import menuReducer from "../TopMenu/stateSlice";

const reducers = combineReducers({
  exchangeRate: exchangeRateReducer,
  menu: menuReducer,
  counter: counterReducer,
  exStateReducer: stateReducer,
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
