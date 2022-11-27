import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import SidebarItem from "./SidebarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SubHeading from "./SubHeading";
import { Outlet } from "react-router-dom";
import Scrollbar from "../Scrollbar";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "#191B28",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  mt: 0,
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={false}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dealer Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Main
        open={true}
        sx={{
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <DrawerHeader />

        <Box display={"flex"}>
          <Box
            sx={{
              backgroundColor: "#222531",
              height: "95vh",
              overflowY: "hidden",
              color: "white",
              pl: 1,
              pr: 1,
              pt: 1,
              pb: 3,
              ...(open ? { minWidth: 220 } : { minWidth: 220 }),
              "&:hover": {
                pr: 0,
                overflowY: "auto",
              },
            }}
          >
            <SidebarItem
              icon={<DashboardIcon />}
              title="Dashboard"
              isSelected
            />

            {/* ------------------ IN house stock ---------------- */}
            <SubHeading title="IN-HOUSE STOCK" />
            <SidebarItem icon={<DashboardIcon />} title="New Stock" />
            <SidebarItem icon={<DashboardIcon />} title="View Stock Details" />
            <SidebarItem icon={<DashboardIcon />} title="Distribute Stock" />

            {/* ------------------ IN house stock ---------------- */}

            {/* -------------------  Dealers --------------------------*/}
            <SubHeading title="DEALERS" />
            <SidebarItem icon={<DashboardIcon />} title="Dealers" />
            <SidebarItem icon={<DashboardIcon />} title="Dealer Stocks" />
            <SidebarItem icon={<DashboardIcon />} title="Dealer Sales" />
            <SidebarItem icon={<DashboardIcon />} title="Dealer Performance" />

            {/* -------------------  Dealers --------------------------*/}

            {/* -------------------  Dealers --------------------------*/}
            <SubHeading title="GAS TANKS" />
            <SidebarItem icon={<DashboardIcon />} title="New Gas Tank" />
            <SidebarItem icon={<DashboardIcon />} title="View Gas Tanks" />

            {/* -------------------  Dealers --------------------------*/}

            {/* -------------------  Dealers --------------------------*/}

            <SubHeading title="PURCHASE ORDERS" />
            <SidebarItem icon={<DashboardIcon />} title="New Orders" />
            <SidebarItem icon={<DashboardIcon />} title="View Orders" />
            <SidebarItem icon={<DashboardIcon />} title="Saved Orders" />
            <SidebarItem icon={<DashboardIcon />} title="Payment Pending" />

            {/* -------------------  Dealers --------------------------*/}
            <SubHeading title="REPORTS" />

            <SidebarItem icon={<DashboardIcon />} title="Reports" />
          </Box>

          <Box
            sx={{
              height: "95vh",
              overflowY: "auto",
              pl: 2,
              pr: 1,
              pb: 5,
              flexGrow: 1,
              backgroundColor: "#F5F5F5",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
