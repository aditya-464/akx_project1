import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Image", "Video", "Audio", "Document"],
  datasets: [
    {
      label: "# of Files",
      data: [12, 19, 3, 5],
      backgroundColor: ["#66a58b", "#1a7851", "#004a2b", "#002a19"],
      borderColor: ["#f1f2f2", "#f1f2f2", "#f1f2f2", "#f1f2f2"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 25,
        boxHeight: 10,
        borderRadius: 7,
        font: {
          family: "Poppins",
          size: 12,
          // weight: "500",
        },
      },
    },
    tooltip: {
      titleFont: {
        family: "Poppins",
        weight: "500",
      },
      bodyFont: {
        family: "Poppins",
      },
      footerFont: {
        family: "Poppins",
      },
    },
  },
};

const DoughnutChart = () => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
