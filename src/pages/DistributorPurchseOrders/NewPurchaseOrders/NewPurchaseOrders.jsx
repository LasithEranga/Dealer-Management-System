import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getOrderByStateAndDistributor,
  rejectOrder,
  saveOrder,
} from "../../../app/api/purchaseOrderServices";
import ContentCard from "../../../components/ContentCard/ContentCard";
import ExpandableTable from "../../../components/ExpandableTable/ExpandableTable";
import { convertToRupees } from "../../../utils/convertToRupees";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";
import { showSystemAlert } from "../../../app/alertServices";
import { Search } from "@mui/icons-material";
import PurchseOrderFiltering from "../../../components/PurchseOrderFiltering/PurchseOrderFiltering";

const NewPurchaseOrders = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.loginDMS);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [search, setSearch] = useState("");
  const [outstandingBalance, setOutstandingBalance] = useState("ob");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [filteringPredicates, setFilteringPredicates] = useState([]);

  const actionButtons = [
    {
      tooltip: "Accept",
      icon: <SwipeRightIcon />,
      onClick: (order) => {
        navigate("/distribute-stock", {
          state: {
            order: order,
          },
        });
        console.log(order);
      },
    },
    {
      tooltip: "Save",
      icon: <SaveAltIcon />,
      onClick: (order) => {
        saveOrder(
          {
            purchaseOrderId: order._id,
          },
          (response) => {
            if (response.status === 0) {
              setRefreshTable(!refreshTable);
              showSystemAlert(response.message, "success");
            } else {
              showSystemAlert(response.message, "error");
            }
          }
        );
      },
    },
    {
      tooltip: "Reject",
      icon: <ThumbDownIcon />,
      onClick: (order) => {
        rejectOrder(
          {
            purchaseOrderId: order._id,
          },
          (response) => {
            if (response.status === 0) {
              setRefreshTable(!refreshTable);
              showSystemAlert(response.message, "success");
            } else {
              showSystemAlert(response.message, "error");
            }
          }
        );
      },
    },
  ];

  const headCells = [
    "Dealer",
    "Date",
    "Store Address",
    "Phone No",
    <Box display={"flex"} justifyContent={"center"} ml={2}>
      Outstanding
    </Box>,
    <Box display={"flex"} justifyContent={"center"} ml={2}>
      State
    </Box>,
    <Box display={"flex"} justifyContent={"center"} ml={2}>
      Actions
    </Box>,
  ];

  const createData = (
    order,
    name,
    date,
    storeAddress,
    phoneNumber,
    outstandingBalance,
    state
  ) => {
    return {
      order,
      name,
      date,
      storeAddress,
      phoneNumber,
      total: (
        <Box display={"flex"} justifyContent={"center"}>
          {convertToRupees(outstandingBalance)}
        </Box>
      ),

      state: (
        <>
          <Box display={"flex"} justifyContent={"center"}>
            <Chip
              size="small"
              label={_.capitalize(state)}
              color="warning"
              sx={{ color: "white", fontWeight: "bold" }}
            />
          </Box>
        </>
      ),
    };
  };

  useEffect(() => {
    getOrderByStateAndDistributor(
      { distributor: userId, state: "PENDING" },
      (response) => {
        setOrders(response.data);
      }
    );
  }, [refreshTable]);

  return (
    <div>
      {/* --------------------------- table section ------------------------------- */}
      <Box mt={2}>
        <ContentCard>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            my={1}
          >
            <Typography fontSize={"1.5rem"} fontWeight="bold">
              New Purchase Orders
            </Typography>
            <Box>
              <Button variant="outlined">Export to PDF</Button>
            </Box>
          </Box>
          <Divider orientation="horizontal" sx={{ my: 2 }} />
          <PurchseOrderFiltering
            setFilteredOrders={setFilteredOrders}
            orders={orders}
          />
          <Divider orientation="horizontal" sx={{ my: 2 }} />

          <ExpandableTable
            headCells={headCells}
            data={filteredOrders}
            ignoreTill={1}
            actionButtons={actionButtons}
          />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default NewPurchaseOrders;
