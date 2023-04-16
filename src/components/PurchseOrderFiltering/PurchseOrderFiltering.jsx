import { Search } from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertToRupees } from "../../utils/convertToRupees";
import _ from "lodash";

export const createData = (
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

const PurchseOrderFiltering = ({ orders, setFilteredOrders }) => {
  const [outstandingBalance, setOutstandingBalance] = useState("ob");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [filteringPredicates, setFilteringPredicates] = useState([]);
  const [search, setSearch] = useState("");

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
  );
};

export default PurchseOrderFiltering;
