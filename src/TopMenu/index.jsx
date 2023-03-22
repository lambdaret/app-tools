import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setToggle, SIDEBAR_OPEN } from "../TopMenu/stateSlice";

const TopMenu = () => {
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(setToggle({ type: SIDEBAR_OPEN }));
  };

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
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Tools - {document.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
