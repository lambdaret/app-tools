import React, { Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HashRouter, Routes, Route } from "react-router-dom";

const Main = React.lazy(() => import("./Main"));
const ExchangeRate = React.lazy(() => import("./ExchangeRate"));
const ReduxTest = React.lazy(() => import("./ReduxTest"));
const ReduxTest2 = React.lazy(() => import("./ReduxTest2"));

const theme = createTheme({
  typography: {
    fontFamily: `"Consolas", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 12,
  },
});

function App() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/exchange-rate/" element={<ExchangeRate />} />
            <Route exact path="/redux-test/" element={<ReduxTest />} />
            <Route exact path="/redux-test2/" element={<ReduxTest2 />} />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </Suspense>
  );
}

export default App;
