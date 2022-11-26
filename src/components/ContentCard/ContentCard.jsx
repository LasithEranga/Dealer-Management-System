import { Box } from "@mui/material";
import React from "react";

const ContentCard = ({ children }) => {
  return (
    <Box p={2} sx={{ backgroundColor: "white", borderRadius: 2 }}>
      {children}
    </Box>
  );
};

export default ContentCard;
