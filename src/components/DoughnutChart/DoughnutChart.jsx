import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";

const DoughnutChart = () => {
  const data = {
    labels: ["klds"],
    datasets: [
      {
        data: [1, 2],
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
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
