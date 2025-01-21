import React, { useEffect, useState } from "react";
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
import RecentUserData from "../RecentUserData/RecentUserData";
import { ColorRing } from "react-loader-spinner";

const DashboardComponent = () => {
  const { currentUser, tenant, refreshUserCount, refreshMediaCount } =
    useSelector((state) => state.page);
  const [actualData, setActualData] = useState(null);

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
      if (response.status === 200) {
        setActualData(response.data.data);
      }
    } catch (error) {
      // console.log(error.message);
      showErrorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    getActualData();
  }, [tenant, refreshMediaCount, refreshUserCount]);

  return (
    <>
      <p id="dashboard-heading-text">Dashboard</p>
      {actualData && (
        <div className="dashboard-component-container">
          <div className="dashboard-left-section">
            <div className="dashboard-component-left-top-section">
              <div className="dashboard-text-data-group">
                <div className="total-users-div">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p className="total-users-heading">Users</p>
                    <FaUser size={"16"}></FaUser>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p className="total-users-count">
                        {actualData.userTypeCounts?.SUPER_ADMIN ?? 0}
                      </p>
                      <p className="total-users-sub-heading">Super Admin</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p className="total-users-count">
                        {actualData.userTypeCounts?.ORGANIZATIONAL_ADMIN ?? 0}
                      </p>
                      <p className="total-users-sub-heading">Org. Admin</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p className="total-users-count">
                        {actualData.userTypeCounts?.USER ?? 0}
                      </p>
                      <p className="total-users-sub-heading">User</p>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="total-media-div">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p className="total-media-heading">Media</p>
                    <MdPermMedia size={"18"}></MdPermMedia>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p className="total-media-count">
                        {actualData.mediaTypeCounts?.IMAGE ?? 0}
                      </p>
                      <p className="total-media-sub-heading">Image</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p className="total-media-count">
                        {(actualData.mediaTypeCounts?.AUDIO ?? 0) +
                          (actualData.mediaTypeCounts?.VIDEO ?? 0)}
                      </p>
                      <p className="total-media-sub-heading">Audio/Video</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p className="total-media-count">
                        {(actualData.mediaTypeCounts?.DOCUMENT ?? 0) +
                          (actualData.mediaTypeCounts?.FILE ?? 0)}
                      </p>
                      <p className="total-media-sub-heading">Doc.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="area-chart-container">
                <p className="area-chart-heading-text">User creation count</p>
                <AreaChartComp actualData={actualData}></AreaChartComp>
              </div>
            </div>

            <div className="dashboard-component-left-bottom-section">
              <RecentUserData completeData={actualData}></RecentUserData>
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
                      <DoughnutChart actualData={actualData}></DoughnutChart>
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
                      <PieChart actualData={actualData}></PieChart>
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
      )}

      {!actualData && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <ColorRing
            visible={!actualData ? true : false}
            height="70"
            width="70"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={[
              "#03c988",
              "#03c988",
              "#03c988",
              "#03c988",
              "#03c988",
              "#03c988",
            ]}
          />
        </div>
      )}
    </>
  );
};

export default DashboardComponent;
