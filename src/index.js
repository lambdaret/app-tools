import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

const persistor = persistStore(store);
const theme = createTheme({
  typography: {
    // htmlFontSize: 25,
    // body1: {
    //   fontSize: 16,
    // },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading ...</div>} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
