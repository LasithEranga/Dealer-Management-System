import { Box, Typography } from "@mui/material";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ArrowDropDown } from "@mui/icons-material";

const StockSummery = ({
  storeName,
  noOfTamks,
  comparisonToLastMonth,
  increased = true,
}) => {
  return (
    <Box p={1} my={0.5}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>{storeName}</Box>
          <Box className="text-secondary fw-bold">{noOfTamks}</Box>
        </Box>
        <Box display={"flex"} alignItems={"center"} sx={{ lineHeight: "0rem" }}>
          <Typography> {comparisonToLastMonth}</Typography>
          {increased ? (
            <ArrowDropUpIcon sx={{ fontSize: "3rem" }} color="success" />
          ) : (
            <ArrowDropDown sx={{ fontSize: "3rem" }} color="error" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StockSummery;
