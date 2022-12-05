import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Outlet } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SubHeading from "./SubHeading";
import logo from "../../asessts/logo.png";
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
  boxShadow: "none",
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
            sx={{ mr: 1 }}
          >
            <MenuIcon sx={{ fontSize: "1.6rem", color: "#B2B2B2" }} />
          </IconButton>
          <Box display={"flex"}>
            <img src={logo} alt="" width="100px" />
          </Box>
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
              scrollbarWidth: "thin",
              ...(open ? { minWidth: 220 } : { minWidth: 220 }),
              "&:hover": {
                pr: 0,
                overflowY: "auto",
              },
            }}
          >
            <SidebarItem icon={<DashboardIcon />} title="Dashboard" path={""} />

            {/* ------------------ IN house stock ---------------- */}
            <SubHeading title="IN-HOUSE STOCK" />
            <SidebarItem
              icon={<DashboardIcon />}
              title="New Stock"
              path={"new-stock"}
            />
            <SidebarItem
              icon={<DashboardIcon />}
              title="View Stock Details"
              path={"view-stock"}
            />
            <SidebarItem
              icon={<DashboardIcon />}
              title="Distribute Stock"
              path={"distribute-stock"}
            />

            {/* ------------------ IN house stock ---------------- */}

            {/* -------------------  Dealers --------------------------*/}
            <SubHeading title="DEALERS" />
            <SidebarItem
              icon={<DashboardIcon />}
              title="Dealers"
              path={"dealers"}
            />
            <SidebarItem icon={<DashboardIcon />} title="Dealer Stocks" />
            <SidebarItem icon={<DashboardIcon />} title="Dealer Sales" />
            <SidebarItem icon={<DashboardIcon />} title="Dealer Performance" />

            {/* -------------------  Dealers --------------------------*/}

            {/* -------------------  Gas tanks --------------------------*/}
            <SubHeading title="GAS TANKS" />
            <SidebarItem
              icon={<DashboardIcon />}
              title="New Gas Tank"
              path={"new-gastank"}
            />
            <SidebarItem
              icon={<DashboardIcon />}
              title="View Gas Tanks"
              path={"view-gastanks"}
            />

            {/* -------------------  Gas tanks --------------------------*/}

            {/* -------------------  PURCHASE ORDERS --------------------------*/}

            <SubHeading title="PURCHASE ORDERS" />
            <SidebarItem icon={<DashboardIcon />} title="New Orders" />
            <SidebarItem icon={<DashboardIcon />} title="View Orders" />
            <SidebarItem icon={<DashboardIcon />} title="Saved Orders" />
            <SidebarItem icon={<DashboardIcon />} title="Payment Pending" />

            {/* -------------------  PURCHASE ORDERS --------------------------*/}
            <SubHeading title="REPORTS" />

            <SidebarItem icon={<DashboardIcon />} title="Reports" />
          </Box>

          <Box
            sx={{
              height: "95vh",
              overflowY: "auto",
              scrollbarWidth: "thin",
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
