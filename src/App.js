import React, {Suspense} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HashRouter, Routes, Route } from "react-router-dom";
import ExchangeRate from "./ExchangeRate/ExchangeRate";
import Main from "./Main";

const theme = createTheme({
  typography: {
    fontFamily: `"Consolas", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 12,
  },
});

function App() {
  return (
    <Suspense fallback={<p>Loading user details...</p>}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/exchange-rate" element={<ExchangeRate />} />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </Suspense>
  );
}

export default App;
