import { Box, Typography } from "@mui/material";
import React from "react";

const SalesCard = ({ title, price, description }) => {
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
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {price}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.8rem",
          fontWeight: "bold",
          color: "grey",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default SalesCard;
