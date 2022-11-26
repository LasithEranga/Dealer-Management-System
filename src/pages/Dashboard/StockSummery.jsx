import { Box, Typography } from "@mui/material";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const StockSummery = () => {
  return (
    <Box p={1} my={0.5}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Lahiru's Store
          </Box>
          <Box className="text-secondary fw-bold">50 Tanks</Box>
        </Box>
        <Box display={"flex"} alignItems={"center"} sx={{ lineHeight: "0rem" }}>
          <Typography> 10% </Typography>
          <ArrowDropUpIcon sx={{ fontSize: "3rem" }} color="success" />
        </Box>
      </Box>
    </Box>
  );
};

export default StockSummery;
