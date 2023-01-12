import { Box, Typography } from "@mui/material";
import React from "react";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

const DoughnutChartWithText = ({ chartTitle, dataSet = [], count = 0 }) => {
  return (
    <Box sx={{ height: "6rem", position: "relative" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.9rem",
          fontWeight: "bold",
          mb: 1,
        }}
      >
        {chartTitle}
      </Typography>

      <DoughnutChart dataSet={dataSet} />
      <Typography
        sx={{
          position: "absolute",
          top: 63,
          left: 38,
          fontSize: "1.3rem",
          fontWeight: "bold",
        }}
      >
        {count}
      </Typography>
    </Box>
  );
};

export default DoughnutChartWithText;
