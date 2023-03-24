import React, { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import TopMenu from "components/TopMenu";
import Container from "@mui/material/Container";
import SideBar from "components/SideBar";
import ScrollTop from "components/ScrollTop";

const Home = React.lazy(() => import("pages/Home"));
const ExchangeRate = React.lazy(() => import("pages/ExchangeRate"));

function App(props) {
  return (
    <Suspense fallback={<div>Loading ...1</div>}>
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
              </Routes>
            </Container>
            <ScrollTop anchorName="back-to-top-anchor" {...props}></ScrollTop>
          </Box>
        </Box>
      </HashRouter>
    </Suspense>
  );
}

export default App;
