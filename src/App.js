import React, { Suspense } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HashRouter, Routes, Route } from "react-router-dom";
import TopMenu from "./TopMenu";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import SideBar from "./SideBar";
// import { useSelector } from "react-redux";
// import { getState, SIDEBAR_OPEN, SIDEBAR_PINED } from "./TopMenu/stateSlice";
// import { setState } from "./TopMenu/stateSlice";
// import { useDispatch } from "react-redux";
const Tools = React.lazy(() => import("./Tools"));
const ExchangeRate = React.lazy(() => import("./ExchangeRate"));
const ReduxTest = React.lazy(() => import("./ReduxTest"));
const ReduxTest2 = React.lazy(() => import("./ReduxTest2"));

function App() {
  // const dispatch = useDispatch();
  // dispatch(setState({ type: SIDEBAR_PINED, value: false }));

  // const open = useSelector(getState(SIDEBAR_OPEN));
  // const pined = useSelector(getState(SIDEBAR_PINED));
  const drawerWidth = 0;

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <HashRouter>
        <Box sx={{ display: "flex" }}>
          <Box xs={{ flexGrow: 1 }}>
            <TopMenu />
          </Box>
          <Box component="nav"></Box>
          <SideBar />
          <Box
            component="main"
            sx={{ p: 3 }}
            style={{ marginLeft: drawerWidth }}
          >
            <Toolbar />
            <Routes>
              <Route exact path="/" element={<Tools />} />
              <Route exact path="/exchange-rate/" element={<ExchangeRate />} />
              <Route exact path="/redux-test/" element={<ReduxTest />} />
              <Route exact path="/redux-test2/" element={<ReduxTest2 />} />
            </Routes>
          </Box>
        </Box>
      </HashRouter>
    </Suspense>
  );
}

export default App;
