import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  setToggle,
  getState as getTitle,
  SIDEBAR_OPEN,
  TITLE,
} from "./stateSlice";

const TopMenu = () => {
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(setToggle({ type: SIDEBAR_OPEN }));
  };
  const title = useSelector(getTitle(TITLE));

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
