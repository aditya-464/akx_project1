import React from "react";
import "./DashboardComponent.css";
// import {
//   BarChart,
//   Bar,
//   Rectangle,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import DoughnutChart from "../Charts/DoughnutChart";
// import AreaChart from "../Charts/AreaChart";

const DashboardComponent = () => {
  const data1 = [
    {
      name: "Page A",
      uv: 4000,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 4000,
      amt: 2400,
    },
    {
      name: "Page G",
      uv: 3000,
      amt: 2210,
    },
    {
      name: "Page I",
      uv: 2000,
      amt: 2290,
    },
    {
      name: "Page J",
      uv: 2780,
      amt: 2000,
    },
    {
      name: "Page K",
      uv: 1890,
      amt: 2181,
    },
    {
      name: "Page L",
      uv: 2390,
      amt: 2500,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data2 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  return (
    <div className="dashboard-component-container">
      <div className="bar-chart-container">
        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer> */}

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            // width={500}
            // height={400}
            data={data1}
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
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="doughnut-chart-container">
        {/* <PieChart
          width={800}
          height={300}
          //  onMouseEnter={this.onPieEnter}
        >
          <Pie
            data={data2}
            style={{ border: "1px solid green" }}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data1.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart> */}

        <DoughnutChart></DoughnutChart>
      </div>

      <DoughnutChart></DoughnutChart>

      {/* <div className="area-chart-container">
        <AreaChart></AreaChart>
      </div> */}
    </div>
  );
};

export default DashboardComponent;
