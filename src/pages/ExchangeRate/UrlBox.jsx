import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useSelector } from "react-redux";
import { getStateExchangeRate, DOWNLOAD_URLS } from "./exchangeRateSlice";

const UrlBox = () => {
  const downloadUrls = useSelector(getStateExchangeRate(DOWNLOAD_URLS));
  return downloadUrls?.map((link) => (
    <Grid item xs={12} key={link}>
      <Link
        href={link}
        target="_blank"
        download
        style={{ wordBreak: "break-all" }}
      >
        {link}
      </Link>
    </Grid>
  ));
};

export default UrlBox;
