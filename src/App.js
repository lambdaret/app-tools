import React, { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import TopMenu from "./TopMenu";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import SideBar from "./SideBar";
const Tools = React.lazy(() => import("./Tools"));
const ExchangeRate = React.lazy(() => import("./ExchangeRate"));
const ReduxTest = React.lazy(() => import("./ReduxTest"));
const ReduxTest2 = React.lazy(() => import("./ReduxTest2"));

function App() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <HashRouter>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <TopMenu />
          </Box>
          <Box component="nav"></Box>
          <SideBar />
          <Box
            component="main"
            sx={{ p: 3 }}
            style={{
              padding: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Toolbar />
            <div>
              <Routes>
                <Route exact path="/" element={<Tools />} />
                <Route
                  exact
                  path="/exchange-rate/"
                  element={<ExchangeRate />}
                />
                <Route exact path="/redux-test/" element={<ReduxTest />} />
                <Route exact path="/redux-test2/" element={<ReduxTest2 />} />
              </Routes>
            </div>
          </Box>
        </Box>
      </HashRouter>
    </Suspense>
  );
}

export default App;
