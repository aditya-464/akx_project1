import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const labels = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// export const data = {
//   labels,
//   datasets: [
//     {
//       fill: true,
//       label: "Users Created",
//       data: [120, 150, 180, 200, 170, 220, 250, 240, 210, 230, 260, 300],
//       borderColor: "rgb(75, 192, 192)",
//       backgroundColor: "rgba(75, 192, 192, 0.5)",
//     },
//   ],
// };

const AreaChartComp = ({ actualData }) => {
  const [finalData, setFinalData] = useState(null);
  // const data1 = [
  //   {
  //     name: "Jan",
  //     Count: 10,
  //   },
  //   {
  //     name: "Feb",
  //     Count: 7,
  //   },
  //   {
  //     name: "Mar",
  //     Count: 10,
  //   },
  //   {
  //     name: "Apr",
  //     Count: 12,
  //   },
  //   {
  //     name: "May",
  //     Count: 10,
  //   },
  //   {
  //     name: "Jun",
  //     Count: 6,
  //   },
  //   {
  //     name: "Jul",
  //     Count: 5,
  //   },
  //   {
  //     name: "Aug",
  //     Count: 9,
  //   },
  //   {
  //     name: "Sep",
  //     Count: 6,
  //   },
  //   {
  //     name: "Oct",
  //     Count: 10,
  //   },
  //   {
  //     name: "Nov",
  //     Count: 12,
  //   },
  //   {
  //     name: "Dec",
  //     Count: 16,
  //   },
  // ];

  const getUserDataset = () => {
    const dataset = Object.entries(actualData.usersByMonth).map(
      ([key, value]) => {
        // Split the year and month
        const [year, month] = key.split("-");

        // Convert the month number to a 3-character month name
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthName = monthNames[parseInt(month, 10) - 1];

        // Construct the name with month and year code
        const name = `${monthName} ${year.slice(-2)}`;

        return { name, Count: value };
      }
    );

    setFinalData(dataset);
  };

  useEffect(() => {
    getUserDataset();
  }, [actualData]);

  return (
    finalData && (
      <>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart
            // width={500}
            // height={400}
            data={finalData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Tooltip /> */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderRadius: "7px",
                border: "none",
                color: "#fff",
                fontWeight: "500",
                fontSize: "12px",
              }}
              itemStyle={{
                color: "#fff", // Tooltip text color for data items
              }}
            />
            <Area
              type="monotone"
              dataKey="Count"
              stroke="#1a7851"
              fill="#1a7851"
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
    )
  );
};

export default AreaChartComp;
