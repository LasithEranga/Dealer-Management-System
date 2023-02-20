import { Box } from "@mui/material";
import React from "react";

const ContentCard = ({ children, sx = {}, onClick = () => {} }) => {
  return (
    <Box
      p={2}
      sx={{ backgroundColor: "white", borderRadius: 2, ...sx }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default ContentCard;
