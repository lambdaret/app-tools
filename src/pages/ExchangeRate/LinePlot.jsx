import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import { JSON_DATA, getStateExchangeRate } from "./exchangeRateSlice";

const getData = (jsonData) => {
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

const LinePlot = ({ onRelayout }) => {
  const jsonData = useSelector(getStateExchangeRate(JSON_DATA));
  const data = getData(jsonData);
  return (
    <Plot
      data={data}
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
  );
};
export default LinePlot;
