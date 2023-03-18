import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option?.code} ${option?.description}`,
});

const BaseBox = ({ options, label, onChange }) => {
  return (
    <Autocomplete
      onChange={onChange}
      autoHighlight
      size="small"
      options={Object.values(options.symbols)}
      getOptionLabel={(option) => option.code}
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
