import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { MdPermMedia } from "react-icons/md";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";

const DashboardComponent = () => {
  const { currentUser, tenant } = useSelector((state) => state.page);

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

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "bottom-center",
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "bottom-center",
    });
  };

  const getActualData = async () => {
    try {
      const headers = {
        "X-TenantID": tenant,
      };
      const response = await axios.get("/dashboard/count", { headers });
    } catch (error) {
      console.log(error.message);
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    getActualData();
  }, [tenant]);

  return (
    <>
      {/* <p id="dashboard-heading-text">Dashboard</p> */}
      <div className="dashboard-component-container">
        <div className="dashboard-left-section">
          <div className="dashboard-component-left-top-section">
            <div className="dashboard-text-data-group">
              <div className="total-users-div">
                <p className="total-users-heading">Users</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="total-users-count">
                    10
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      +
                    </span>
                  </p>
                  <FaUser size={"15"}></FaUser>
                </div>
                <p className="total-users-sub-heading">Active users count</p>
              </div>
              <div className="total-media-div">
                <p className="total-media-heading">Media</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="total-media-count">25</p>
                  <MdPermMedia size={"16"}></MdPermMedia>
                </div>
                <p className="total-media-sub-heading">Present Media count</p>
              </div>
              <div className="total-client-div">
                <p className="total-client-heading">Clients</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="total-client-count">2</p>
                  <BsBriefcaseFill size={"17"}></BsBriefcaseFill>
                </div>
                <p className="total-client-sub-heading">
                  Current clients count
                </p>
              </div>
            </div>
            <div className="area-chart-container">
              <p className="area-chart-heading-text">User creation count</p>
              <AreaChartComp></AreaChartComp>
            </div>
          </div>

          <div className="dashboard-component-left-bottom-section">
            
          </div>
        </div>

        <div className="dashboard-right-section">
          <div className="dashboard-component-right-top-section">
            <div className="bottom-charts-container">
              <div className="bottom-chart add-bottom-spacing">
                <p className="doughnut-chart-heading-text">Media count</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="doughnut-chart-container">
                    <DoughnutChart></DoughnutChart>
                  </div>
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
                {/* <div className="bottom-charts-bottom-spacing"></div> */}
              </div>

              <div className="bottom-chart">
                <p className="doughnut-chart-heading-text">
                  Media approval count
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="doughnut-chart-container">
                    <PieChart></PieChart>
                  </div>
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
                {/* <div className="bottom-charts-bottom-spacing"></div> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bottom-charts-bottom-spacing"></div> */}
      </div>
    </>
  );
};

export default DashboardComponent;
