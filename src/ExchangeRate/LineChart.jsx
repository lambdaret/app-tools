import React, { Suspense, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import { getState, JSON_URL } from "./stateSlice";
import fetchData from "../api/fetchData";

const getData = ({ rates }) => {
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
      };
    });
    return data;
  } else {
    return [];
  }
};

const fetchChart = (jsonUrl) => fetchData(jsonUrl);

const LineChart = () => {
  const [data, setData] = useState();
  const jsonUrl = useSelector(getState(JSON_URL));
  useEffect(() => {
    if (jsonUrl) {
      setData(fetchChart(jsonUrl));
    }
  }, [jsonUrl]);
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      {data && (
        <Plot
          data={getData(data.read())}
          layout={{
            showlegend: true,
            autosize: true,
            xaxis: {
              type: "date",
              tickformat: "%Y-%m-%d",
              tickangle: -45,
            },
            width: "100%",
            height: "auto",
            title: `Exchange Rate - Base: ${data.read()["base"]}`,
          }}
        />
      )}
    </Suspense>
  );
};

export default LineChart;
