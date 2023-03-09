import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
    },
  },
};

const BarChart = ({
  height = 200,
  labels = ["January", "February", "March", "April", "May", "June", "July"],
  datasetI = [],
  datasetII = [],
}) => {
  const data = {
    labels,

    datasets: [
      {
        label: "Sales",
        data: [...datasetI],
        backgroundColor: "#6d848e",
      },
      {
        label: "Returns",
        data: [...datasetII],
        backgroundColor: "#fd8080",
      },
    ],
  };
  return <Bar options={options} data={data} height={height} />;
};

export default BarChart;
