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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,

  datasets: [
    {
      label: "Dataset 1",
      data: [10, 20, 30, 45, 50, 20, 10],
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Dataset 2",
      data: [10, 20, 30, 45, 50, 20, 10],
      backgroundColor: "rgba(53, 162, 235, 1)",
    },
  ],
};
const BarChart = () => {
  return <Bar options={options} data={data} height={200} />;
};

export default BarChart;