import { Box } from "@mui/material";
import React from "react";

const DoughnutChartLegends = ({
  className = "",
  label = "",
  count = 0,
  indicatorColor = "black",
  indicatorWH = "15px",
  legendTextClassName = "",
  indicatorStyle = {},
  textStyle = {},
}) => {
  return (
    <Box display="flex" my={1} alignItems={"center"} gap={1}>
      <span
        className="rounded-circle"
        style={{
          width: indicatorWH,
          height: indicatorWH,
          backgroundColor: indicatorColor,
          ...indicatorStyle,
        }}
      ></span>
      <Box
        className="col d-flex justify-content-between pe-1 "
        display={"flex"}
        justifyContent="space-between"
        pl={1}
      >
        <span className={` ${legendTextClassName}`} style={{ ...textStyle }}>
          {label}
        </span>
      </Box>
    </Box>
  );
};

export default DoughnutChartLegends;
