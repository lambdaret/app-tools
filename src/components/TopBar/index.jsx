import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  setToggleTopBar,
  getStateTopBar,
  SIDEBAR_OPEN,
  MENU_NM,
} from "./topBarSlice";

const getTitle = (menuNm) => {
  switch (menuNm) {
    case "Exchange Rate":
      return "Exchange Rate";
    default:
      return menuNm;
  }
};

const TopBar = () => {
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(setToggleTopBar(SIDEBAR_OPEN));
  };
  const menuNm = useSelector(getStateTopBar(MENU_NM));
  const title = getTitle(menuNm);

  return (
    <AppBar positon="static">
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          align="right"
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
