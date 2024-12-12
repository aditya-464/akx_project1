import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Number of Users Created per Month",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Users Created",
      data: [120, 150, 180, 200, 170, 220, 250, 240, 210, 230, 260, 300],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};

const AreaChart = () => {
  return <Line options={options} data={data} />;
};

export default AreaChart;
