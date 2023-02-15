import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDealerStockSummery } from "../../app/api/gasStockServices";
import DealerStockCard from "../../components/DealerStockCard/DealerStockCard";

const ViewDealerStocks = () => {
  const { userId } = useSelector((state) => state.loginDMS);
  const [dealerDetails, setDealerDetails] = useState([]);

  useEffect(() => {
    getDealerStockSummery(
      {
        userId: userId,
      },
      (response) => {
        console.log("response", response);
        setDealerDetails(response.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          View Dealer Stocks
        </Typography>
        <Box>
          <TextField
            label=""
            variant="outlined"
            placeholder="Search by dealer name"
            size="small"
            sx={{ width: "20rem" }}
          />
          <Select
            label=""
            variant="outlined"
            placeholder="Select status"
            size="small"
            value={""}
            sx={{ width: "10rem", ml: 2 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </Box>
      </Box>
      {/* content area */}
      <Grid container columnSpacing={4} rowSpacing={4} mt={2}>
        {dealerDetails.map((dealer, index) => {
          return <DealerStockCard dealer={dealer} key={index} />;
        })}
      </Grid>
    </Box>
  );
};

export default ViewDealerStocks;
