import { Box, Typography } from "@mui/material";
import React from "react";

const SalesCard = () => {
  return (
    <Box
      sx={{
        height: "8rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 1,
        px: 2,
        borderRadius: 1,
        backgroundColor: "white",
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        Avg Sales
      </Typography>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Rs. 10,000
      </Typography>
      <Typography
        sx={{
          fontSize: "0.8rem",
          fontWeight: "bold",
          color: "grey",
        }}
      >
        Average sales made by the dealer in last year
      </Typography>
    </Box>
  );
};

export default SalesCard;
