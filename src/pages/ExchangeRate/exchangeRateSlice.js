import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

export const START_DATE = "START_DATE";
export const END_DATE = "END_DATE";
export const FORMAT = "FORMAT";
export const BASE = "BASE";
export const SYMBOLS = "SYMBOLS";
export const AMOUNT = "AMOUNT";
export const PLACE = "PLACE";
export const SOURCE = "SOURCE";
export const DOWNLOAD_URLS = "DOWNLOAD_URLS";
export const DOWNLOAD_DATA = "DOWNLOAD_DATA";
export const JSON_URL = "JSON_URL";
export const JSON_PARAM = "JSON_PARAM";
export const JSON_DATA = "JSON_DATA";

const now = format(new Date(), "yyyy-MM-dd");

export const stateSlice = createSlice({
  name: "exchangeRate",
  initialState: {
    value: {
      START_DATE: now,
      END_DATE: now,
      FORMAT: "",
      BASE: null,
      SYMBOLS: [],
      AMOUNT: "",
      PLACE: "",
      SOURCE: null,
      JSON_URL: null,
      JSON_PARAM: null,
      JSON_DATA: [],
    },
  },
  reducers: {
    setStateExchangeRate: (state, action) => {
      const payload = action.payload;
      if (payload) {
        state.value[payload.type] = payload.value;
      }
    },
  },
});

// export const { setState } = stateSlice.actions;
export const setStateExchangeRate = (type, action) => {
  return stateSlice.actions.setStateExchangeRate({ type: type, value: action });
};

export const getStateExchangeRate = (type) => (state) =>
  state.exchangeRate.value[type];

export default stateSlice.reducer;
