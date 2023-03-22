import { createSlice } from "@reduxjs/toolkit";

export const SIDEBAR_OPEN = "SIDEBAR_OPEN";
export const SIDEBAR_PINED = "SIDEBAR_PINED";

export const stateSlice = createSlice({
  name: "menu",
  initialState: {
    value: {
      SIDEBAR_OPEN: false,
      SIDEBAR_PINED: false,
    },
  },
  reducers: {
    setState: (state, action) => {
      const payload = action.payload;
      if (payload) {
        state.value[payload.type] = payload.value;
      }
    },
    setToggle: (state, action) => {
      const payload = action.payload;
      if (payload) {
        state.value[payload.type] = !state.value[payload.type];
      }
    },
  },
});

export const { setState, setToggle } = stateSlice.actions;

export const getState = (type) => (state) => state.menu.value[type];

export default stateSlice.reducer;
