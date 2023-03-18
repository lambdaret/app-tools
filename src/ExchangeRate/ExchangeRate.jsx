import React, { useState, Suspense } from "react";
import fetchData from "../api/fetchData";
import { format } from "date-fns";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import DateBox from "./DateBox";
import SourceBox from "./SourceBox";
import FormatBox from "./FormatBox";
import BaseBox from "./BaseBox";
import SymbolBox from "./SymbolBox";
import TextBox from "./TextBox";

const fetchSymbol = fetchData("https://api.exchangerate.host/symbols");

const ExchangeRate = () => {
  const now = format(new Date(), "yyyy-MM-dd");

  const [selectedStartDate, setSelectedStartDate] = useState(now);
  const [selectedEndDate, setSelectedEndDate] = useState(now);
  const [selectedSource, setSelectedSource] = useState();
  const [selectedFormat, setSelectedFormat] = useState();
  const [selectedBase, setSelectedBase] = useState();
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState();
  const [selectedPlace, setSelectedPlace] = useState();
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [downloadData, setDownloadData] = useState();

  const handleChangeStartDate = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStartDate(value);
  };
  const handleChangeEndDate = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedEndDate(value);
  };
  const handleChangeSource = (event, value) => {
    setSelectedSource(value);
  };
  const handleChangeFormat = (event, value) => {
    setSelectedFormat(value);
  };
  const handleChangeBase = (event, value) => {
    setSelectedBase(value);
  };
  const handleChangeSymbol = (event, value) => {
    setSelectedSymbols(value);
  };
  const handleChangeAmount = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAmount(value);
  };
  const handleClearAmount = (event) => {
    setSelectedAmount("");
  };
  const handleChangePlace = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPlace(value);
  };
  const handleClearPlace = (event) => {
    setSelectedPlace("");
  };

  const handleGetData = () => {
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
    setDownloadUrls([downloadUrl]);

    if (ext === "json") {
      fetch(downloadUrl)
        .then((res) => res.json())
        .then((res) => {
          setDownloadData(JSON.stringify(res, null, 2));
        });
    } else {
      fetch(downloadUrl)
        .then((res) => res.text())
        .then((res) => {
          setDownloadData(res);
        });
    }
  };

  const symbols = fetchSymbol.read();

  return (
    <div style={{ padding: 5 }}>
      <h1>ExchangeRate</h1>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <DateBox
            label="Start Date"
            defaultValue={selectedStartDate}
            onChange={handleChangeStartDate}
          />
        </Grid>
        <Grid item xs={4}>
          <DateBox
            label="End Date"
            defaultValue={selectedEndDate}
            onChange={handleChangeEndDate}
          />
        </Grid>
        <Grid item xs={4}>
          <FormatBox onChange={handleChangeFormat} />
        </Grid>
        <Grid item xs={6}>
          <Suspense fallback={<p>Loading user details...</p>}>
            <BaseBox
              label="Base"
              options={symbols}
              onChange={handleChangeBase}
            />
          </Suspense>
        </Grid>
        <Grid item xs={6}>
          <Suspense fallback={<p>Loading user details...</p>}>
            <SymbolBox
              label="Symbols"
              options={symbols}
              multiple={true}
              onChange={handleChangeSymbol}
            />
          </Suspense>
        </Grid>
        <Grid item xs={6}>
          <TextBox
            label="Amount"
            value={selectedAmount}
            onClear={handleClearAmount}
            onChange={handleChangeAmount}
          />
        </Grid>
        <Grid item xs={6}>
          <TextBox
            label="Place"
            value={selectedPlace}
            onClear={handleClearPlace}
            onChange={handleChangePlace}
          />
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<p>Loading user details...</p>}>
            <SourceBox onChange={handleChangeSource} />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex" }}>
            <Button variant="contained" onClick={handleGetData} size="small">
              Get Data
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Exchange Rate"
            multiline
            rows={18}
            sx={{ width: "100%" }}
            value={downloadData}
          />
        </Grid>
        {downloadUrls?.map((link) => (
          <Grid item xs={12} key={link}>
            <Link href={link} target="_blank" download>
              {link}
            </Link>
          </Grid>
        ))}

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
