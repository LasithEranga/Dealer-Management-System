import { Box } from "@mui/material";
import React, { Component } from "react";
import Chart from "react-apexcharts";

const Test = () => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },

    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
      ],
    },
  };
  const series = [
    {
      name: "Series 1",
      data: [45, 52, 38, 45, 19, 23, 2],
    },
  ];

  return (
    <Box>
      <Chart
        options={options}
        series={series}
        type="area"
        height="350"
        width="50%"
      />
    </Box>
  );
};

export default Test;
