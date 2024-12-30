import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const DoughnutChart = ({ actualData }) => {
  const [finalData, setFinalData] = useState(null);

  const getMediaValues = () => {
    let arr = [];
    arr.push(actualData.mediaTypeCounts?.IMAGE ?? 0);
    arr.push(actualData.mediaTypeCounts?.VIDEO ?? 0);
    arr.push(actualData.mediaTypeCounts?.AUDIO ?? 0);
    arr.push(
      (actualData.mediaTypeCounts?.DOCUMENT ?? 0) +
        (actualData.mediaTypeCounts?.FILE ?? 0)
    );

    const data = {
      labels: ["Image", "Video", "Audio", "Document"],
      datasets: [
        {
          label: "# of Files",
          data: arr,
          backgroundColor: ["#66a58b", "#1a7851", "#004a2b", "#002a19"],
          borderColor: ["#f1f2f2", "#f1f2f2", "#f1f2f2", "#f1f2f2"],
          borderWidth: 1,
        },
      ],
    };

    setFinalData(data);
  };

  useEffect(() => {
    getMediaValues();
  }, [actualData]);

  return finalData && <Doughnut data={finalData} options={options} />;
};

export default DoughnutChart;
