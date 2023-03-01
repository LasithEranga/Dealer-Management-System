import { Box, Typography } from "@mui/material";
import React from "react";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

const DoughnutChartWithText = ({ chartTitle, dataSet = [], count = 0 }) => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
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
      <Box sx={{ height: "6rem", width: "6rem", position: "relative" }}>
        <DoughnutChart dataSet={dataSet} />
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {count}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DoughnutChartWithText;
