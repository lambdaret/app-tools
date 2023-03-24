import React from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { getState } from "./stateSlice";

const TextBox = ({ label, type, onClear, onChange }) => {
  const selectedValue = useSelector(getState(type));
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      value={selectedValue}
      onChange={onChange}
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <IconButton
            sx={{ visibility: selectedValue ? "visible" : "hidden" }}
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
