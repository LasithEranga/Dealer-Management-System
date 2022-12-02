import { Box } from "@mui/material";
import React from "react";

const ContentCard = ({ children, sx = {} }) => {
  return (
    <Box p={2} sx={{ backgroundColor: "white", borderRadius: 2, ...sx }}>
      {children}
    </Box>
  );
};

export default ContentCard;
