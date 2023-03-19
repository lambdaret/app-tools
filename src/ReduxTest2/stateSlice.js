import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "exState",
  initialState: {
    value: {
      s1: "",
      s2: "",
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

export const getState = (type) => (state) => state.exStateReducer.value[type];

export default stateSlice.reducer;
