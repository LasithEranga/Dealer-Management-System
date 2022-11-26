import { Box, Typography } from "@mui/material";
import React from "react";

const PieChartLegend = ({
  label = "",
  count = 0,
  indicatorColor = "black",
  indicatorWH = "15px",
  indicatorStyle = {},
}) => {
  return (
    <Box display={"flex"} alignItems="center" gap={1} pl={0.5}>
      <span
        style={{
          width: indicatorWH,
          height: indicatorWH,
          backgroundColor: indicatorColor,
          ...indicatorStyle,
        }}
      ></span>
      <Box
        display={"flex"}
        justifyContent="space-between"
        width={"100%"}
        pr={1}
      >
        <Box>{label}</Box>
        <Box>{count}</Box>
      </Box>
    </Box>
  );
};

export default PieChartLegend;
