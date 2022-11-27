import { Box, Typography } from "@mui/material";
import React from "react";

const Titlebar = ({ title }) => {
  return (
    <Box>
      <Typography fontSize={"1.5rem"} lineHeight="1.5rem">
        {title}
      </Typography>
    </Box>
  );
};

export default Titlebar;
