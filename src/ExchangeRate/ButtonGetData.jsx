import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setState,
  getState,
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
} from "./stateSlice";

const ButtonGetData = () => {
  const dispatch = useDispatch();
  const setSelected = (nm, value) => {
    dispatch(setState({ type: nm, value: value }));
  };

  const selectedStartDate = useSelector(getState(START_DATE));
  const selectedEndDate = useSelector(getState(END_DATE));
  const selectedFormat = useSelector(getState(FORMAT));
  const selectedBase = useSelector(getState(BASE));
  const selectedSource = useSelector(getState(SOURCE));
  const selectedSymbols = useSelector(getState(SYMBOLS));
  const selectedAmount = useSelector(getState(AMOUNT));
  const selectedPlace = useSelector(getState(PLACE));

  const handleGetData = () => {
    setSelected(DOWNLOAD_URLS, []);
    setSelected(DOWNLOAD_DATA, "");

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
