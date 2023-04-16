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
import { useSelector } from "react-redux";
import LoupeIcon from "@mui/icons-material/Loupe";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SkateboardingIcon from "@mui/icons-material/Skateboarding";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import GradeIcon from "@mui/icons-material/Grade";
import ViewListIcon from "@mui/icons-material/ViewList";
import PushPinIcon from "@mui/icons-material/PushPin";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SellIcon from "@mui/icons-material/Sell";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import SwipeRightAltIcon from "@mui/icons-material/SwipeRightAlt";
import AddCardIcon from "@mui/icons-material/AddCard";
import DownloadingIcon from "@mui/icons-material/Downloading";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

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
  const userType = useSelector((state) =>
    state.loginDMS.type ? state.loginDMS.type : "DEALER"
  );
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
          {userType === "DISTRIBUTOR" && (
            <Box
              sx={{
                backgroundColor: "#222531",
                height: "95vh",
                overflowY: "hidden",
                color: "white",
                pl: 1,
                pr: 1,
                pt: 1,
                pb: 7,
                scrollbarWidth: "thin",
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
                path={""}
              />

              {/* ------------------ IN house stock ---------------- */}
              <SubHeading title="IN-HOUSE STOCK" />
              <SidebarItem
                icon={<LoupeIcon />}
                title="New Stock"
                path={"new-stock"}
              />
              <SidebarItem
                icon={<Inventory2Icon />}
                title="View Stock Details"
                path={"view-stock"}
              />
              <SidebarItem
                icon={<LocalShippingIcon />}
                title="Distribute Stock"
                path={"distribute-stock"}
              />

              {/* ------------------ IN house stock ---------------- */}

              {/* -------------------  Dealers --------------------------*/}
              <SubHeading title="DEALERS" />
              <SidebarItem
                icon={<PeopleAltIcon />}
                title="Dealers"
                path={"dealers"}
              />
              <SidebarItem
                icon={<Inventory2Icon />}
                path="dealer-stocks"
                title="Dealer Stocks"
              />
              <SidebarItem
                icon={<CurrencyExchangeIcon />}
                title="Dealer Sales"
                path={"dealer-sales"}
              />

              {/* -------------------  Dealers --------------------------*/}

              {/* -------------------  Gas tanks --------------------------*/}
              <SubHeading title="GAS TANKS" />
              <SidebarItem
                icon={<PropaneTankIcon />}
                title="New Gas Tank"
                path={"new-gastank"}
              />
              <SidebarItem
                icon={<ViewInArIcon />}
                title="View Gas Tanks"
                path={"view-gastanks"}
              />

              {/* -------------------  Gas tanks --------------------------*/}

              {/* -------------------  PURCHASE ORDERS --------------------------*/}

              <SubHeading title="PURCHASE ORDERS" />
              <SidebarItem
                icon={<GradeIcon />}
                title="New Orders"
                path={"new-orders"}
              />
              <SidebarItem
                icon={<SwipeRightAltIcon />}
                title="Accepted Orders"
                path={"accepted-orders-distributor"}
              />
              <SidebarItem
                icon={<PushPinIcon />}
                title="Saved Orders"
                path={"saved-orders"}
              />
              <SidebarItem
                icon={<PendingActionsIcon />}
                title="Pending Payment"
                path="payment-pending-orders"
              />
              <SidebarItem
                icon={<ViewListIcon />}
                title="View Orders"
                path="view-orders"
              />

              {/* -------------------  PURCHASE ORDERS --------------------------*/}
              <SubHeading title="REPORTS" />

              <SidebarItem
                icon={<AutoGraphIcon />}
                title="Reports"
                path="distributor-reports"
              />
            </Box>
          )}

          {userType === "DEALER" && (
            <Box
              sx={{
                backgroundColor: "#222531",
                height: "95vh",
                overflowY: "hidden",
                color: "white",
                pl: 1,
                pr: 1,
                pt: 1,
                pb: 6,
                scrollbarWidth: "thin",
                ...(open ? { minWidth: 220 } : { minWidth: 220 }),
                "&:hover": {
                  pr: 0,
                  overflowY: "auto",
                },
              }}
            >
              {/* ------------------ SELLING ---------------- */}
              <SubHeading title="SELLING" />
              <SidebarItem icon={<SellIcon />} title="Sell Tanks" path={""} />
              <SidebarItem
                icon={<KeyboardReturnIcon />}
                title="Accept Returns"
                path={"accept-return"}
              />

              {/* ------------------ SELLING ---------------- */}

              {/* -------------------  MANAGE STOCK --------------------------*/}
              <SubHeading title="Manage Stock" />
              <SidebarItem
                icon={<LoupeIcon />}
                title="New Stock"
                path={"new-stock"}
                //TODO:
              />
              <SidebarItem
                icon={<Inventory2Icon />}
                title="View Stock"
                path={"view-stock"}
              />
              <SidebarItem
                path={"return-to-distributor"}
                icon={<AssignmentReturnIcon />}
                title="Return Stock"
              />

              {/* -------------------  MANAGE STOCK --------------------------*/}

              {/* -------------------  PURCHASE ORDERS --------------------------*/}

              <SubHeading title="PURCHASE ORDERS" />
              <SidebarItem
                icon={<AddCardIcon />}
                title="New Order"
                path={"new-order"}
              />
              <SidebarItem
                icon={<DownloadingIcon />}
                title="Pending Orders"
                path={"pending-orders"}
              />
              <SidebarItem
                icon={<SwipeRightAltIcon />}
                title="Accepted Orders"
                path={"accepted-orders"}
              />
              <SidebarItem
                icon={<ThumbDownAltIcon />}
                title="Declined Orders"
                path={"declined-orders"}
              />
              <SidebarItem
                icon={<HourglassTopIcon />}
                title="Pending Payments"
                path={"pending-payments-dealer"}
              />

              {/* -------------------  PURCHASE ORDERS --------------------------*/}
              <SubHeading title="REPORTS" />

              <SidebarItem
                icon={<AutoGraphIcon />}
                title="Reports"
                path="dealer-reports"
              />
            </Box>
          )}

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
