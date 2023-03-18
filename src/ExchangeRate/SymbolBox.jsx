import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option?.code} ${option?.description}`,
});

const SymbolBox = ({ options, label, onChange }) => {
  return (
    <Autocomplete
      multiple
      autoHighlight
      onChange={onChange}
      size="small"
      options={Object.values(options.symbols)}
      disableCloseOnSelect
      getOptionLabel={(option) => option.code}
      filterOptions={filterOptions}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8, paddingTop: 0, paddingBottom: 0 }}
            checked={selected}
          />
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

export default SymbolBox;
