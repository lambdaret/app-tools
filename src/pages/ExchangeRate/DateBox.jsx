import React from "react";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { getStateExchangeRate } from "./exchangeRateSlice";

const DateBox = ({ label, type, onChange }) => {
  const selectedDate = useSelector(getStateExchangeRate(type));
  return (
    <TextField
      label={label}
      type="date"
      value={selectedDate}
      onChange={onChange}
      size="small"
      sx={{ width: "100%" }}
      inputProps={{ style: { paddingLeft: 5 } }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateBox;
