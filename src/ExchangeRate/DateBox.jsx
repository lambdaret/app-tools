import React from "react";
import TextField from "@mui/material/TextField";

const DateBox = ({ label, defaultValue, onChange }) => {
  return (
    <TextField
      label={label}
      type="date"
      defaultValue={defaultValue}
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
