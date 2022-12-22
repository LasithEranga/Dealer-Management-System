import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import DealerStockCard from "../../components/DealerStockCard/DealerStockCard";

const ViewDealerStocks = () => {
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
            label="Search dealer name"
            variant="outlined"
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
      <Box
        mt={4}
        display={"flex"}
        gap={4}
        flexWrap="wrap"
        px={4}
        justifyContent={"space-between"}
      >
        <DealerStockCard />
        <DealerStockCard />
        <DealerStockCard />
        <DealerStockCard />
        <DealerStockCard />
        <DealerStockCard />
        <DealerStockCard />
      </Box>
    </Box>
  );
};

export default ViewDealerStocks;
