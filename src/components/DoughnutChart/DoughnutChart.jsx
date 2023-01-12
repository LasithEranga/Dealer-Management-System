import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";

const DoughnutChart = ({ dataSet = [] }) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: dataSet,
        backgroundColor: ["#685FC2", "#888888"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
