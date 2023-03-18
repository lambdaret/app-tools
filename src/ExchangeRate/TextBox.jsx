import React from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const TextBox = ({ label, value, onClear, onChange }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <IconButton
            sx={{ visibility: value ? "visible" : "hidden" }}
            onClick={onClear}
          >
            <ClearIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default TextBox;
