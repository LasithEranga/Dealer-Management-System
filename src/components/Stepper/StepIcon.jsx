import { Person } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

const StepIcon = () => {
  return (
    <Box
      item
      sx={{
        backgroundColor: "#23c074",
        p: 1,
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Person />
    </Box>
  );
};

export default StepIcon;
