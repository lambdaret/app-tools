import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PushPinIcon from "@mui/icons-material/PushPin";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setStateTopBar,
  setToggleTopBar,
  getStateTopBar,
  SIDEBAR_OPEN,
  SIDEBAR_PINED,
  MENU_NM,
} from "components/TopBar/topBarSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const open = useSelector(getStateTopBar(SIDEBAR_OPEN));
  const pined = useSelector(getStateTopBar(SIDEBAR_PINED));
  const menuNm = useSelector(getStateTopBar(MENU_NM));
  const navigate = useNavigate();

  const drawerWidth = open ? 180 : 0;
  // const drawerWidth = open ? "29%" : 0;

  const handleDrawerClose = (e) => {
    dispatch(setStateTopBar(SIDEBAR_OPEN, false));
  };
  const handleDrawerCloseUnPined = (e) => {
    if (!pined) {
      dispatch(setStateTopBar(SIDEBAR_OPEN, false));
    }
  };
  const handleSidebarPined = (e) => {
    dispatch(setToggleTopBar(SIDEBAR_PINED));
  };
  const goMenu = (menuNm) => {
    switch (menuNm) {
      case "Exchange Rate":
        navigate("/exchange-rate/");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      // variant="persistent"
      // variant="temporary"
      // variant="permanent"
      variant={pined ? "persistent" : "temporary"}
      ModalProps={{ keepMounted: true }}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <Box>
        <Grid container>
          <Grid item xs={10}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleSidebarPined}>
              <PushPinIcon
                size="small"
                color={pined ? "primary" : "disabled"}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <List style={{ padding: 0 }} onClick={handleDrawerCloseUnPined}>
          {["Home", "Exchange Rate"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => goMenu(text)}>
                <ListItemIcon style={{ minWidth: 25 }}>
                  <Brightness1Icon
                    fontSize="small"
                    color={menuNm === text ? "primary" : "disabled"}
                  />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default SideBar;
