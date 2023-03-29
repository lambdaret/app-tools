import React, { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getStateExchangeRate, JSON_PARAM } from "./exchangeRateSlice";
import Plot from "react-plotly.js";
import axios from "axios";

const getUrls = (jsonParam) => {
  if (jsonParam == null) {
    return [];
  }
  const { start_date, end_date } = jsonParam;
  const start_year = +start_date.slice(0, 4);
  const end_year = +end_date.slice(0, 4);

  const url = "https://api.exchangerate.host/timeseries";
  const apiUrls = [];
  for (let year = start_year; year <= end_year; year++) {
    let start_day = `${year}-01-01`;
    let end_day = `${year}-12-31`;
    if (year === start_year) {
      start_day = start_date;
    }
    if (year === end_year) {
      end_day = end_date;
    }
    const newJsonParam = {
      ...jsonParam,
      start_date: start_day,
      end_date: end_day,
    };
    const apiUrl = `${url}?${new URLSearchParams(newJsonParam).toString()}`;
    apiUrls.push(apiUrl);
  }
  return apiUrls;
};

const getData = (results) => {
  const datas = results.map((result) => result.data);

  const data = datas.slice(1).reduce((acc, cur) => {
    return {
      base: acc.base,
      motd: acc.motd,
      success: acc.success,
      timeseries: acc.timeseries,
      start_date:
        acc.start_date <= cur.start_date ? acc.start_date : cur.start_date,
      end_date: acc.end_date <= cur.end_date ? cur.end_date : acc.end_date,
      rates: { ...acc.rates, ...cur.rates },
    };
  }, datas[0]);
  return data;
};

const getRates = (jsonData) => {
  if (jsonData === undefined) {
    return [];
  }

  const { rates } = jsonData;
  if (rates === undefined) {
    return [];
  }

  const dates = Object.keys(rates);
  const symbol_x = {};
  const symbol_y = {};
  if (dates?.length > 0) {
    for (let date of dates) {
      const rates_date = rates[date];
      for (let symbol in rates[date]) {
        const rate = rates_date[symbol];
        if (!(symbol in symbol_x)) {
          symbol_x[symbol] = [];
          symbol_y[symbol] = [];
        }
        symbol_x[symbol].push(date);
        symbol_y[symbol].push(rate);
      }
    }
    const symbols = Object.keys(symbol_x);
    const data = symbols.map((symbol) => {
      return {
        x: Object.values(symbol_x[symbol]),
        y: Object.values(symbol_y[symbol]),
        type: "scatter",
        name: symbol,
        visible: symbol === symbols[0] ? true : "legendonly",
      };
    });
    return data;
  } else {
    return [];
  }
};

const LineChart = () => {
  const dispatch = useDispatch();
  const jsonParam = useSelector(getStateExchangeRate(JSON_PARAM));
  const [jsonData, setJsonData] = useState([]);

  const apiUrls = getUrls(jsonParam);

  const { data: datas, refetch } = useQuery({
    queryKey: ["query"],
    queryFn: () => axios.all(apiUrls.map((apiUrl) => axios.get(apiUrl))),
    refetchOnWindowFocus: false,
    suspense: true,
    enable: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, jsonParam]);

  useEffect(() => {
    const data = getData(datas);
    getRates();
    setJsonData(data);
  }, [datas, dispatch]);

  const onRelayout = (e) => {};
  return (
    <Suspense fallback={<div>Loading ...6</div>}>
      <Plot
        data={getRates(jsonData)}
        useResizeHandler={true}
        layout={{
          showlegend: true,
          autosize: true,
          dragmode: "pan",
          xaxis: {
            type: "date",
            tickformat: "%Y-%m-%d",
            tickangle: -45,
          },
          title: `Exchange Rate - Base: ${jsonData?.base || ""}`,
        }}
        config={{
          displayModeBar: true,
          displaylogo: false,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        onRelayout={onRelayout}
      />
    </Suspense>
  );
};

export default LineChart;
