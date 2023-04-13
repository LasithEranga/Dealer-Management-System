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
  purchaseOrderMarkAsPaid,
} from "../../../app/api/purchaseOrderServices";
import ContentCard from "../../../components/ContentCard/ContentCard";
import ExpandableTable from "../../../components/ExpandableTable/ExpandableTable";
import { convertToRupees } from "../../../utils/convertToRupees";

import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { Search } from "@mui/icons-material";
import { showSystemAlert } from "../../../app/alertServices";

const SavedPurchaseOrders = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.loginDMS);
  const [orders, setOrders] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("pleaseSelect");

  const actionButtons = [
    {
      tooltip: "Payment received",
      icon: <CreditScoreIcon />,
      onClick: (order) => {
        purchaseOrderMarkAsPaid(
          {
            purchaseOrderId: order._id,
          },
          (response) => {
            if (response.status === 0) {
              setRefreshTable(!refreshTable);
              showSystemAlert("Payment received successfully", "success");
            }
          },
          (error) => {
            console.log(error);
          }
        );
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
    getOrderByStateAndDistributor(
      { distributor: userId, state: "PENDING_PAYMENT" },
      (response) => {
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
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              Pending Payment Orders
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs={6} display="flex" gap={2}>
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
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  gap={1}
                  alignItems="center"
                >
                  <TextField
                    type="date"
                    fullWidth
                    size="small"
                    placeholder="min"
                    onChange={(e) => {}}
                  />
                  <Typography>to</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    size="small"
                    placeholder="max"
                    onChange={(e) => {}}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider orientation="horizontal" sx={{ my: 2 }} />

          <ExpandableTable
            headCells={headCells}
            data={orders}
            ignoreTill={1}
            actionButtons={actionButtons}
            showOutstandingAfterAccept={false}
          />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default SavedPurchaseOrders;