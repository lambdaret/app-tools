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

const now = format(new Date(), "yyyy-MM-dd");

export const stateSlice = createSlice({
  name: "exchangeRate",
  initialState: {
    value: {
      START_DATE: now,
      END_DATE: now,
      FORMAT: "",
      BASE: {},
      SYMBOLS: [],
      AMOUNT: "",
      PLACE: "",
      SOURCE: {},
    },
  },
  reducers: {
    setState: (state, action) => {
      const payload = action.payload;
      if (payload) {
        state.value[payload.type] = payload.value;
      }
    },
  },
});

export const { setState } = stateSlice.actions;

export const getState = (type) => (state) => state.exchangeRate.value[type];

export default stateSlice.reducer;
