import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { getStateExchangeRate, DOWNLOAD_DATA } from "./exchangeRateSlice";

const DataBox = () => {
  const value = useSelector(getStateExchangeRate(DOWNLOAD_DATA));
  return (
    <TextField
      label="Rate"
      focused
      multiline
      rows={15}
      sx={{ width: "100%" }}
      value={value}
      inputProps={{ wrap: "off" }}
    />
  );
};

export default DataBox;
