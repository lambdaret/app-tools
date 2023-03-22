import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useSelector } from "react-redux";
import { getState, DOWNLOAD_URLS } from "./stateSlice";

const UrlBox = () => {
  const downloadUrls = useSelector(getState(DOWNLOAD_URLS));
  return downloadUrls?.map((link) => (
    <Grid item xs={12} key={link}>
      <Link href={link} target="_blank" download style={{ inlineSize: "100%" }}>
        {link}
      </Link>
    </Grid>
  ));
};

export default UrlBox;
