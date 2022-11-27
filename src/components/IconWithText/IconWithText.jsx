import { Box } from "@mui/material";
import React from "react";

const IconWithText = ({ icon, title, isActive = false }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ lineHeight: "0.8rem" }}
    >
      <Box>{icon}</Box>
      <Box style={{ fontSize: "0.7rem" }}>{title}</Box>
    </Box>
  );
};

export default IconWithText;
