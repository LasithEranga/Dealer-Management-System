import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllOrders,
  getOrderByState,
} from "../../app/api/purchaseOrderServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import ExpandableTable from "../../components/ExpandableTable/ExpandableTable";
import { convertToRupees } from "../../utils/convertToRupees";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import { useNavigate } from "react-router-dom";

const SavedPurchaseOrders = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.loginDMS);

  const [showEditModal, setShowEditModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [update, setUpdate] = useState({
    isUpdating: true,
    _id: "",
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("pleaseSelect");
  const [outstandingBalance, setOutstandingamount] = useState({
    min: "",
    max: "",
  });

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
      tooltip: "Reject",
      icon: <ThumbDownIcon />,
      onClick: (order) => {
        console.log(order);
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
    getOrderByState({ state: "SAVED" }, (response) => {
      console.log(response);

      setOrders(
        response.data.map((oneEl) =>
          createData(
            oneEl,
            oneEl.dealer?.name,
            new Date(oneEl.createdAt).toLocaleDateString(),
            oneEl.dealer?.storeAddress,
            oneEl.dealer?.phoneNumber,
            oneEl.dealer?.outstandingAmount,
            oneEl.state
          )
        )
      );
    });
  }, [refreshTable]);

  return (
    <div>
      {/* --------------------------- table section ------------------------------- */}
      <Box>
        <ContentCard>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            my={1}
          >
            <Typography fontSize={"1.5rem"} fontWeight="bold">
              Saved Purchase Orders
            </Typography>
            <Box>
              <Button variant="outlined">Export to PDF</Button>
            </Box>
          </Box>
          <Divider orientation="horizontal" sx={{ my: 2 }} />
          <Box>
            <Grid container>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by Dealer name"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs={5} display="flex" gap={1}>
                <FormControl size="small" sx={{ flexGrow: 1 }}>
                  <Select
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    defaultValue={""}
                    value="Date"
                  >
                    <MenuItem value={"Date"} disabled>
                      Date
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ flexGrow: 1 }}>
                  <Select
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    defaultValue={""}
                    value="Status"
                  >
                    <MenuItem value={"Status"} disabled>
                      Status
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ flexGrow: 1 }}>
                  <Select
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    defaultValue={""}
                    value="ob"
                  >
                    <MenuItem value={"ob"} disabled>
                      Outstanding balance
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Divider orientation="horizontal" sx={{ my: 2 }} />

          <ExpandableTable
            headCells={headCells}
            data={orders}
            ignoreTill={1}
            actionButtons={actionButtons}
          />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default SavedPurchaseOrders;
