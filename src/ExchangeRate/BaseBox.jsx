import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { getState, BASE } from "./stateSlice";
const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option?.code} ${option?.description}`,
});

const isOptionEqualToValue = (option, value) => {
  if (value === "") {
    return true;
  }
  return option?.code === value?.code;
};

const BaseBox = ({ options, label, onChange }) => {
  const selectedBase = useSelector(getState(BASE));
  return (
    <Autocomplete
      onChange={onChange}
      autoHighlight
      size="small"
      options={Object.values(options.symbols)}
      value={selectedBase}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={(option) => option?.code || ""}
      filterOptions={filterOptions}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ paddingTop: 0, paddingBottom: 0 }}>
          {option.code} - {option.description}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
    />
  );
};

export default BaseBox;
