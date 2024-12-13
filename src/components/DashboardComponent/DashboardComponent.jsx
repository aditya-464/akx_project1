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

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

import DoughnutChart from "../Charts/DoughnutChart";
import PieChart from "../Charts/PieChart";
import AreaChartComp from "../Charts/AreaChartComp";

const DashboardComponent = () => {
  const data1 = [
    {
      name: "Jan",
      val: 10,
    },
    {
      name: "Feb",
      val: 7,
    },
    {
      name: "Mar",
      val: 10,
    },
    {
      name: "Apr",
      val: 12,
    },
    {
      name: "May",
      val: 10,
    },
    {
      name: "Jun",
      val: 6,
    },
    {
      name: "Jul",
      val: 5,
    },
    {
      name: "Aug",
      val: 9,
    },
    {
      name: "Sep",
      val: 6,
    },
    {
      name: "Oct",
      val: 10,
    },
    {
      name: "Nov",
      val: 12,
    },
    {
      name: "Dec",
      val: 16,
    },
  ];

  return (
    <div className="dashboard-component-container">
      <div className="area-chart-container">
        <p className="area-chart-heading-text">User creation count</p>
        <AreaChartComp></AreaChartComp>
      </div>

      <div className="bottom-charts-container">
        <div style={{ width: "48%", marginLeft: "1rem" }}>
          <p className="doughnut-chart-heading-text">Media count</p>
          <div className="doughnut-chart-container">
            <DoughnutChart></DoughnutChart>
          </div>
          <div
            style={{
              width: "100%",
              height: "2rem",
              backgroundColor: "#f1f2f2",
              marginBottom: "5rem !important",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              height: "5rem",
              backgroundColor: "white",
              marginBottom: "5rem !important",
            }}
          ></div>
        </div>

        <div style={{ width: "48%", marginLeft: "1rem" }}>
          <p className="doughnut-chart-heading-text">Media approval count</p>
          <div className="doughnut-chart-container">
            <PieChart></PieChart>
          </div>
          <div
            style={{
              width: "100%",
              height: "2rem",
              backgroundColor: "#f1f2f2",
              marginBottom: "5rem !important",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              height: "5rem",
              backgroundColor: "white",
              marginBottom: "5rem !important",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
