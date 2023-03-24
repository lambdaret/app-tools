import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { getState, DOWNLOAD_DATA } from "./stateSlice";

const DataBox = () => {
  const value = useSelector(getState(DOWNLOAD_DATA));
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
