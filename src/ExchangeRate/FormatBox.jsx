import React from "react";
import { useSelector } from "react-redux";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getState, FORMAT } from "./stateSlice";
const FormatBox = ({ onChange }) => {
  const selectedFormat = useSelector(getState(FORMAT));
  return (
    <Autocomplete
      onChange={onChange}
      size="small"
      value={selectedFormat}
      options={["xml", "csv", "tsv"]}
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ paddingTop: 0, paddingBottom: 0 }}>
          {option}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label="Format" placeholder="Format" />
      )}
    />
  );
};

export default FormatBox;
