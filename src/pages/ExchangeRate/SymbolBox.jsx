import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useSelector } from "react-redux";
import { getState, SYMBOLS } from "./stateSlice";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option?.code} ${option?.description}`,
});

const isOptionEqualToValue = (option, value) => {
  if (value === null) {
    return true;
  }
  return option?.code === value?.code;
};
const SymbolBox = ({ options, label, onChange }) => {
  const selectedSymbols = useSelector(getState(SYMBOLS));
  return (
    <Autocomplete
      multiple
      autoHighlight
      onChange={onChange}
      size="small"
      options={Object.values(options.symbols)}
      value={selectedSymbols}
      isOptionEqualToValue={isOptionEqualToValue}
      disableCloseOnSelect
      getOptionLabel={(option) => option?.code || ""}
      filterOptions={filterOptions}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8, paddingTop: 0, paddingBottom: 0 }}
            checked={selected}
          />
          {option?.code} - {option?.description}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
    />
  );
};

export default SymbolBox;
