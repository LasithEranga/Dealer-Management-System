import { Box } from "@mui/material";
import React from "react";

const ColouredLine = ({ width, height, backgroundColor, sx }) => {
  return <Box sx={{ backgroundColor, width, height, ...sx }}></Box>;
};

export default ColouredLine;
