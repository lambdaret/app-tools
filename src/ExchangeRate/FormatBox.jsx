import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const FormatBox = ({ onChange }) => {
  return (
    <Autocomplete
      onChange={onChange}
      size="small"
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
