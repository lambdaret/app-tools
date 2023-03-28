import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setStateExchangeRate,
  getStateExchangeRate,
  START_DATE,
  END_DATE,
  FORMAT,
  BASE,
  SOURCE,
  SYMBOLS,
  AMOUNT,
  PLACE,
  DOWNLOAD_URLS,
  DOWNLOAD_DATA,
  JSON_URL,
  JSON_PARAM,
  JSON_DATA,
} from "./exchangeRateSlice";

const ButtonGetData = () => {
  const dispatch = useDispatch();
  const setSelected = (nm, value) => {
    dispatch(setStateExchangeRate(nm, value));
  };

  const selectedStartDate = useSelector(getStateExchangeRate(START_DATE));
  const selectedEndDate = useSelector(getStateExchangeRate(END_DATE));
  const selectedFormat = useSelector(getStateExchangeRate(FORMAT));
  const selectedBase = useSelector(getStateExchangeRate(BASE));
  const selectedSource = useSelector(getStateExchangeRate(SOURCE));
  const selectedSymbols = useSelector(getStateExchangeRate(SYMBOLS));
  const selectedAmount = useSelector(getStateExchangeRate(AMOUNT));
  const selectedPlace = useSelector(getStateExchangeRate(PLACE));

  const handleGetData = () => {
    setSelected(DOWNLOAD_URLS, []);
    setSelected(DOWNLOAD_DATA, "");
    setSelected(JSON_URL, "");
    setSelected(JSON_DATA, {});

    const params = {
      start_date: selectedStartDate || "",
      end_date: selectedEndDate || "",
      base: selectedBase?.code || "",
      symbols: selectedSymbols
        ? selectedSymbols.map(({ code }) => code).join(",")
        : "",
      amount: selectedAmount || "",
      places: selectedPlace || "",
      format: selectedFormat || "",
      source: selectedSource?.source || "",
    };
    const url = "https://api.exchangerate.host/timeseries";
    const ext = selectedFormat ? selectedFormat : "json";
    const downloadUrl = `${url}?${new URLSearchParams(params).toString()}`;
    // const jsonUrl = `${url}?${new URLSearchParams({
    //   ...params,
    //   format: "",
    // }).toString()}`;
    setSelected(JSON_URL, url);
    setSelected(JSON_PARAM, {
      ...params,
      format: "",
    });
    setSelected(DOWNLOAD_URLS, [downloadUrl]);

    if (ext === "json") {
      fetch(downloadUrl)
        .then((res) => res.json())
        .then((res) => {
          setSelected(DOWNLOAD_DATA, JSON.stringify(res, null, 2));
        });
    } else {
      fetch(downloadUrl)
        .then((res) => res.text())
        .then((res) => {
          setSelected(DOWNLOAD_DATA, res);
        });
    }
  };
  return (
    <Button variant="contained" onClick={handleGetData} size="small">
      Get Data
    </Button>
  );
};

export default ButtonGetData;
