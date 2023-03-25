import { createSlice } from "@reduxjs/toolkit";

export const SIDEBAR_OPEN = "SIDEBAR_OPEN";
export const SIDEBAR_PINED = "SIDEBAR_PINED";
export const MENU_NM = "MENU_NM";

export const stateSlice = createSlice({
  name: "topBar",
  initialState: {
    value: {
      SIDEBAR_OPEN: false,
      SIDEBAR_PINED: false,
      MENU_NM: "",
      TITLE: "Tools",
    },
  },
  reducers: {
    setStateTopBar: (state, action) => {
      const payload = action.payload;
      if (payload) {
        state.value[payload.type] = payload.value;
      }
    },
    setToggleTopBar: (state, action) => {
      const payload = action.payload;
      if (payload) {
        state.value[payload.type] = !state.value[payload.type];
      }
    },
  },
});

export const setStateTopBar = (type, action) => {
  return stateSlice.actions.setStateTopBar({ type: type, value: action });
};
export const setToggleTopBar = (type) => {
  return stateSlice.actions.setToggleTopBar({ type: type });
};

export const getStateTopBar = (type) => (state) => state.topBar.value[type];

export default stateSlice.reducer;
