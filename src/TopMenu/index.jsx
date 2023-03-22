import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setToggle, getState, SIDEBAR_OPEN, MENU_NM } from "./stateSlice";

const getTitle = (menuNm) => {
  switch (menuNm) {
    case "Exchange Rate":
      return "Exchange Rate";
    default:
      return menuNm;
  }
};

const TopMenu = () => {
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(setToggle({ type: SIDEBAR_OPEN }));
  };
  const menuNm = useSelector(getState(MENU_NM));
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
