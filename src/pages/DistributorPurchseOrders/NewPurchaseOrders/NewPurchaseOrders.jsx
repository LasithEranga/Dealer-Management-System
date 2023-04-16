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
        console.log(response);
        setOrders(response.data);
      }
    );
  }, [refreshTable]);

  useEffect(() => {
    if (search === "") {
      setFilteredOrders(
        orders.map((oneEl) =>
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
    } else {
      setFilteringPredicates((prev) => ({
        ...prev,
        search: (oneEl) =>
          oneEl.dealer?.name.toLowerCase().includes(search.toLowerCase()),
      }));
      // setFilteredOrders(
      //   orders
      //     .filter((oneEl) =>

      //     )
      //     .map((oneEl) =>
      //       createData(
      //         oneEl,
      //         oneEl.dealer?.name,
      //         new Date(oneEl.createdAt).toLocaleDateString(),
      //         oneEl.dealer?.storeAddress,
      //         oneEl.dealer?.phoneNumber,
      //         oneEl.dealer?.outstandingAmount,
      //         oneEl.state
      //       )
      //     )
      // );
    }
  }, [search, orders]);

  useEffect(() => {
    switch (outstandingBalance) {
      case "50000":
        setFilteringPredicates((prev) => ({
          ...prev,
          outstandingBalance: (oneEl) => oneEl.dealer.outstandingAmount < 50000,
        }));
        break;
      case "50000 - 100000":
        setFilteringPredicates((prev) => ({
          ...prev,
          outstandingBalance: (oneEl) =>
            oneEl.dealer.outstandingAmount > 50000 &&
            oneEl.dealer.outstandingAmount < 100000,
        }));
        break;

      case "100000 - 150000":
        setFilteringPredicates((prev) => ({
          ...prev,
          outstandingBalance: (oneEl) =>
            oneEl.dealer.outstandingAmount > 100000 &&
            oneEl.dealer.outstandingAmount < 150000,
        }));
        break;

      case "150000":
        setFilteringPredicates((prev) => ({
          ...prev,
          outstandingBalance: (oneEl) =>
            oneEl.dealer.outstandingAmount >= 150000,
        }));
        break;

      default:
    }
  }, [outstandingBalance]);

  useEffect(() => {
    if (from && to) {
      setFilteringPredicates((prev) => ({
        ...prev,
        fromTo: (oneEl) => {
          const date = new Date(oneEl.updatedAt);
          return date >= new Date(from) && date <= new Date(to);
        },
      }));
    }
  }, [from, to]);

  useEffect(() => {
    filterByPredicates();
  }, [filteringPredicates]);

  // const filterByOutstandingAmount = (predicate) => {
  //   setFilteredOrders(
  //     orders
  //       .filter((oneEl) => predicate(oneEl))
  //       .map((oneEl) =>
  //         createData(
  //           oneEl,
  //           oneEl.dealer?.name,
  //           new Date(oneEl.createdAt).toLocaleDateString(),
  //           oneEl.dealer?.storeAddress,
  //           oneEl.dealer?.phoneNumber,
  //           oneEl.dealer?.outstandingAmount,
  //           oneEl.state
  //         )
  //       )
  //   );
  // };

  const filterByPredicates = () => {
    let filteredResult = [...orders];

    Object.values(filteringPredicates).forEach((onePredicate) => {
      filteredResult = filteredResult.filter((oneEl) => onePredicate(oneEl));
    });

    setFilteredOrders(
      filteredResult.map((oneEl) =>
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
  };

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
                      setOutstandingBalance(e.target.value);
                    }}
                    defaultValue={""}
                    value={outstandingBalance}
                    placeholder="Outstanding balance"
                  >
                    <MenuItem value={"ob"} disabled>
                      Outstanding balance
                    </MenuItem>
                    <MenuItem value={"50000"}>&lt; Rs.50,000</MenuItem>
                    <MenuItem value={"50000 - 100000"}>
                      Rs.50,000 - Rs.100,000
                    </MenuItem>
                    <MenuItem value={"100000 - 150000"}>
                      Rs.100,000 - Rs.150,000
                    </MenuItem>
                    <MenuItem value={"150000"}>&gt; Rs.150,000</MenuItem>
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
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);
                    }}
                  />
                  <Typography>to</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    size="small"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
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
