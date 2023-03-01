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
      label: "Sales",
      data: [520230, 420230, 560890, 620690, 450750, 450750, 490750],
      backgroundColor: "#6d848e",
    },
    {
      label: "Returns",
      data: [100000, 80000, 150000, 200000, 80000, 100000, 100000],
      backgroundColor: "#fd8080",
    },
  ],
};
const BarChart = ({ height = 200 }) => {
  return <Bar options={options} data={data} height={height} />;
};

export default BarChart;
