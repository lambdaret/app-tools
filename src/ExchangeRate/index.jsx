import React, { Suspense, useEffect } from "react";
import fetchData from "../api/fetchData";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import DateBox from "./DateBox";
import SourceBox from "./SourceBox";
import FormatBox from "./FormatBox";
import BaseBox from "./BaseBox";
import SymbolBox from "./SymbolBox";
import TextBox from "./TextBox";

import { useDispatch } from "react-redux";
import {
  setState,
  START_DATE,
  END_DATE,
  FORMAT,
  BASE,
  SOURCE,
  SYMBOLS,
  AMOUNT,
  PLACE,
} from "./stateSlice";
import { MENU_NM, setState as setMenuState } from "../TopMenu/stateSlice";
import ButtonGetData from "./ButtonGetData";
import DataBox from "./DataBox";
import UrlBox from "./UrlBox";
import LineChart from "./LineChart";

const fetchSymbol = fetchData("https://api.exchangerate.host/symbols");

const ExchangeRate = () => {
  const dispatch = useDispatch();

  const setSelected = (nm, value) => {
    dispatch(setState({ type: nm, value: value }));
  };

  const handleChangeStartDate = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(START_DATE, value);
  };
  const handleChangeEndDate = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(END_DATE, value);
  };
  const handleChangeFormat = (event, value) => {
    setSelected(FORMAT, value);
  };
  const handleChangeBase = (event, value) => {
    setSelected(BASE, value);
  };
  const handleChangeSource = (event, value) => {
    setSelected(SOURCE, value);
  };
  const handleChangeSymbol = (event, value) => {
    setSelected(SYMBOLS, value);
  };
  const handleChangeAmount = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(AMOUNT, value);
  };
  const handleClearAmount = (event) => {
    setSelected(AMOUNT, "");
  };
  const handleChangePlace = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(PLACE, value);
  };
  const handleClearPlace = (event) => {
    setSelected(PLACE, "");
  };
  const symbols = fetchSymbol.read();

  useEffect(() => {
    dispatch(setMenuState({ type: MENU_NM, value: "Exchange Rate" }));
  }, [dispatch]);

  return (
    <div style={{ padding: 0 }}>
      <Grid container spacing={1}>
        <Grid item xs="auto" style={{ width: "36%" }}>
          <DateBox
            label="Start Date"
            type={START_DATE}
            onChange={handleChangeStartDate}
          />
        </Grid>
        <Grid item xs="auto" style={{ width: "36%" }}>
          <DateBox
            label="End Date"
            type={END_DATE}
            onChange={handleChangeEndDate}
          />
        </Grid>
        <Grid item xs="auto" style={{ width: "28%" }}>
          <FormatBox onChange={handleChangeFormat} />
        </Grid>
        <Grid item xs="auto" style={{ width: "50%" }}>
          <Suspense fallback={<div>Loading ...3</div>}>
            <BaseBox
              label="Base"
              options={symbols}
              onChange={handleChangeBase}
            />
          </Suspense>
        </Grid>
        <Grid item xs="auto" style={{ width: "50%" }}>
          <Suspense fallback={<div>Loading ...4</div>}>
            <SymbolBox
              label="Symbols"
              options={symbols}
              multiple={true}
              onChange={handleChangeSymbol}
            />
          </Suspense>
        </Grid>
        <Grid item xs="auto" style={{ width: "50%" }}>
          <TextBox
            label="Amount"
            type={AMOUNT}
            onClear={handleClearAmount}
            onChange={handleChangeAmount}
          />
        </Grid>
        <Grid item xs="auto" style={{ width: "50%" }}>
          <TextBox
            label="Place"
            type={PLACE}
            onClear={handleClearPlace}
            onChange={handleChangePlace}
          />
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<div>Loading ...5</div>}>
            <SourceBox onChange={handleChangeSource} />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex" }}>
            <ButtonGetData />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<div>Loading ...7</div>}>
            <LineChart style={{ width: "100%" }} />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <DataBox />
        </Grid>
        <UrlBox />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Link href="https://exchangerate.host/#/docs" target="_blank">
            https://exchangerate.host/#/docs
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link href="https://api.exchangerate.host/symbols" target="_blank">
            https://api.exchangerate.host/symbols
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link href="https://api.exchangerate.host/sources" target="_blank">
            https://api.exchangerate.host/sources
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link
            href="https://api.exchangerate.host/cryptocurrencies"
            target="_blank"
          >
            https://api.exchangerate.host/cryptocurrencies
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExchangeRate;
