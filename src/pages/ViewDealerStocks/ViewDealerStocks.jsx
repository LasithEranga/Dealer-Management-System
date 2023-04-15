import { Search } from "@mui/icons-material";
import {
  Box,
  Grid,
  InputAdornment,
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
  const [dealerStocks, setDealerStocks] = useState([]);
  const [filteredDealerStocks, setFilteredDealerStocks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [noStockMessage, setNoStockMessage] = useState("");

  useEffect(() => {
    getDealerStockSummery(
      {
        userId: userId,
      },
      (response) => {
        console.log("response", response);
        setDealerStocks(response.data);
      },
      (error) => {
        console.log("error", error);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    let timeout = null;
    if (searchText.length > 0) {
      setFilteredDealerStocks(
        dealerStocks.filter((dealer) => {
          return dealer.name.toLowerCase().includes(searchText.toLowerCase());
        })
      );
    } else {
      setFilteredDealerStocks(dealerStocks);
      timeout = setTimeout(() => {
        setNoStockMessage("No stocks to show");
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [dealerStocks, searchText]);

  useEffect(() => {
    switch (status) {
      case "all":
        setFilteredDealerStocks(dealerStocks);
        break;
      case "fastMoving":
        setFilteredDealerStocks(checkForStockType("FAST_MOVING"));
        break;
      case "moderateMoving":
        setFilteredDealerStocks(checkForStockType("MODERATE_MOVING"));
        break;
      case "slowMoving":
        setFilteredDealerStocks(checkForStockType("SLOW_MOVING"));
        break;
      default:
        setFilteredDealerStocks(dealerStocks);
    }
  }, [dealerStocks, status]);

  const checkForStockType = (stockType) => {
    const matchingStocks = [];
    filteredDealerStocks.forEach((oneStock) => {
      //check whether the stock is fast moving or not
      const stocks = oneStock.stocks;
      stocks.forEach((stock) => {
        const gasTanks = stock.quantities;
        gasTanks.forEach((gasTank) => {
          if (gasTank.stockMovingSpeed === stockType) {
            matchingStocks.push(oneStock);
          }
        });
      });
    });
    return matchingStocks;
  };

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            label=""
            variant="outlined"
            placeholder="Select status"
            size="small"
            value={status}
            sx={{ width: "10rem", ml: 2 }}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="fastMoving">Fast Moving</MenuItem>
            <MenuItem value="moderateMoving">Moderate Moving</MenuItem>
            <MenuItem value="slowMoving">Slow Moving</MenuItem>
          </Select>
        </Box>
      </Box>
      {/* content area */}
      <Grid container columnSpacing={4} rowSpacing={4} mt={2}>
        {filteredDealerStocks.map((dealer, index) => {
          return <DealerStockCard dealer={dealer} key={index} />;
        })}
      </Grid>

      {/* if no stocks to show display message box */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Typography fontSize="1.5rem" fontWeight="bold">
            Loading Stocks
          </Typography>
        </Box>
      ) : (
        filteredDealerStocks.length === 0 && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <Typography fontSize="1.5rem" fontWeight="bold">
              {noStockMessage}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default ViewDealerStocks;
