import React, { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import TopMenu from "./TopMenu";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import SideBar from "./SideBar";
import Container from "@mui/material/Container";
import ScrollTop from "./components/ScrollTop";

// import { useSelector } from "react-redux";
// import { getState, SIDEBAR_OPEN } from "./TopMenu/stateSlice";
// import { getState, SIDEBAR_OPEN, SIDEBAR_PINED } from "./TopMenu/stateSlice";

const Home = React.lazy(() => import("./Home"));
const ExchangeRate = React.lazy(() => import("./ExchangeRate"));
const ReduxTest = React.lazy(() => import("./ReduxTest"));
const ReduxTest2 = React.lazy(() => import("./ReduxTest2"));

function App(props) {
  // const open = useSelector(getState(SIDEBAR_OPEN));
  // const pined = useSelector(getState(SIDEBAR_PINED));

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <HashRouter>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <TopMenu />
          </Box>
          <Box component="nav">
            <SideBar />
          </Box>
          <Box
            component="main"
            sx={{ p: 0 }}
            style={{
              padding: 5,
              width: "100%",
              height: "100%",
              margin: 0,
            }}
          >
            <Toolbar id="back-to-top-anchor" />
            <Container
              style={{
                padding: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                marginTop: 10,
              }}
            >
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/exchange-rate/"
                  element={<ExchangeRate />}
                />
                <Route exact path="/redux-test/" element={<ReduxTest />} />
                <Route exact path="/redux-test2/" element={<ReduxTest2 />} />
              </Routes>
            </Container>
            <ScrollTop anchorName="back-to-top-anchor" {...props}>
              {/* <Fab size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab> */}
            </ScrollTop>
          </Box>
        </Box>
      </HashRouter>
    </Suspense>
  );
}

export default App;
