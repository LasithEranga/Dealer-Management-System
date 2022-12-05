import { Box } from "@mui/material";
import React from "react";

const FlexBox = ({ sx, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default FlexBox;
