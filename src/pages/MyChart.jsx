import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const MyChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register({
      type: "myCustomChart",
      defaults: {
        // default options for the new chart type
      },
      // implementation of the new chart type
    });

    const chart = new Chart(chartRef.current, {
      type: "myCustomChart",
      data,
      options,
    });
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default MyChart;
