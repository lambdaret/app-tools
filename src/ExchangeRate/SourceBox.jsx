import React from "react";
import fetchData from "../api/fetchData";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const fetchSource1 = fetchData("https://api.exchangerate.host/sources");
const fetchSource2 = fetchData(
  "https://api.exchangerate.host/cryptocurrencies"
);

const filterSourceOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option?.source} ${option?.description}`,
});

const getSource = () => {
  const source1 = fetchSource1.read();
  const source2 = fetchSource2.read();

  const s1 = Object.values(source1.sources).map(
    ({ source, name, available_from_date }) => {
      return {
        group: "sources",
        source: source,
        description: name,
        available_from_date: available_from_date,
      };
    }
  );
  const s2 = Object.values(source2.cryptocurrencies).map(({ symbol, name }) => {
    return {
      group: "cryptocurrencies",
      source: symbol.toLowerCase(),
      description: name,
    };
  });
  return [...s1, ...s2];
};

const SourceBox = ({ onChange }) => {
  const sources = getSource();
  return (
    <Autocomplete
      autoHighlight
      onChange={onChange}
      size="small"
      style={{ width: "100%" }}
      options={sources}
      isOptionEqualToValue={(option, value) => option.source === value.source}
      groupBy={(option) => option.group}
      // disableCloseOnSelect
      getOptionLabel={(option) => option.source}
      filterOptions={filterSourceOptions}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ paddingTop: 0, paddingBottom: 0 }}>
          {option.source} - {option.description}{" "}
          {option?.available_from_date
            ? `(${option?.available_from_date}~)`
            : null}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Source" placeholder="Source" />
      )}
    />
  );
};

export default SourceBox;
