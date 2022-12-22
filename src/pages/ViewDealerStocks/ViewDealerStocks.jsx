import { Box, Typography } from "@mui/material";
import React from "react";

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
          View Stock Details
        </Typography>
      </Box>
      {/* content area */}
    </Box>
  );
};

export default ViewDealerStocks;
