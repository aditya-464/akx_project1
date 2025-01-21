import React, { useEffect, useState } from "react";
import "./UserData.css";
import { SlOptionsVertical } from "react-icons/sl";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import { ColorRing } from "react-loader-spinner";

const UserData = ({ userFilterApi }) => {
  const [actualData, setActualData] = useState(null);
  const [visibleMenuId, setVisibleMenuId] = useState(null); // Tracks the menu's visibility
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState("");
  const [deleteUserModalVisible, setdeleteUserModalVisible] = useState(false);
  const [deleteUserDetails, setDeleteUserDetails] = useState("");
  const { refreshUserCount } = useSelector((state) => state.page);
  const { currentUser, tenant } = useSelector((state) => state.page);

  // Toggle menu visibility for a specific item
  const toggleMenu = (id) => {
    setVisibleMenuId(visibleMenuId === id ? null : id);
  };

  // Close menu when clicked outside
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".popup-menu") &&
      !e.target.closest(".users-data-option-div")
    ) {
      setVisibleMenuId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Edit handler
  const handleEdit = (item) => {
    // alert(`Edit user: ${user.name}`);
    setEditUserDetails(item);
    setEditUserModalVisible(true);
    setVisibleMenuId(null); // Close the menu
  };

  // Delete handler
  const handleDelete = (item) => {
    // alert(`Delete user: ${user.name}`);
    setDeleteUserDetails(item);
    setdeleteUserModalVisible(true);
    setVisibleMenuId(null); // Close the menu
  };

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

      if (userFilterApi == null) {
        const response = await axios.get("/userProfile", { headers });
        if (response.data.data) {
          setActualData(response.data.data);
        }
      } else {
        const response = await axios.get(userFilterApi, { headers });
        if (response.data.data) {
          setActualData(response.data.data);
        }
      }
    } catch (error) {
      // console.log(error.message);
      showErrorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    getActualData();
  }, [refreshUserCount, tenant, userFilterApi]);

  // useEffect(() => {
  //   if (!actualData) return;
  // }, [actualData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "SUPER_ADMIN":
        return "orange";
      case "ORGANIZATIONAL_ADMIN":
        return "green";
      case "USER":
        return "blue";
      default:
        return "white";
    }
  };

  const handleSortingOfData = (val) => {
    let tempData = [...actualData]; // Use a copy of the data to avoid mutating state directly

    if (val === "name" || val === "email") {
      tempData.sort((a, b) => {
        if (a[val] && b[val]) {
          return a[val].localeCompare(b[val]);
        }
        return 0;
      });
    } else if (val === "mobile" || val === "id") {
      tempData.sort((a, b) => a[val] - b[val]);
    } else if (val === "createdOn") {
      tempData.sort((a, b) => new Date(a[val]) - new Date(b[val]));
    }

    setActualData(tempData);
  };

  if (!actualData) {
    return (
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
    );
  }

  return (
    actualData && (
      <div id="users-data-container">
        {
          <>
            <div id="users-data-headings-div">
              <div id="users-heading-checkbox"></div>
              <p
                className="users-heading-id"
                style={{ cursor: "pointer" }}
                onClick={() => handleSortingOfData("id")}
              >
                Id
              </p>
              <p className="users-heading-image">Image</p>
              <p
                className="users-heading-name"
                style={{ cursor: "pointer" }}
                onClick={() => handleSortingOfData("name")}
              >
                Name
              </p>
              <p
                className="users-heading-mobile"
                style={{ cursor: "pointer" }}
                onClick={() => handleSortingOfData("mobile")}
              >
                Mobile
              </p>
              <p
                className="users-heading-email"
                style={{ cursor: "pointer" }}
                onClick={() => handleSortingOfData("email")}
              >
                Email
              </p>
              <p
                className="users-heading-created-on"
                style={{ cursor: "pointer" }}
                onClick={() => handleSortingOfData("createdOn")}
              >
                Created On
              </p>
              <div
                className="users-data-option-div"
                style={{ visibility: "hidden" }}
              >
                <SlOptionsVertical size={12} />
              </div>
            </div>

            <div id="users-data-partition-horizontal"></div>
            {actualData.length == 0 && (
              <div
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: "2rem 0rem",
                }}
              >
                <p>No data</p>
              </div>
            )}
            {actualData.length > 0 && (
              <div id="users-data-content-div">
                {actualData.map((item) => (
                  <div key={item.id} className="users-data-item-div">
                    <p className="users-heading-id users-data-item">
                      {item.id}
                    </p>
                    <div className="users-heading-image users-data-item">
                      {/* <img
                      className="users-data-image"
                      // src={
                      //   item.brandingLogo ||
                      //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      // }
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt={item.name}
                    /> */}
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <Avatar
                          name={item.name}
                          size="35"
                          round={true}
                          color="#d9dada"
                          fgColor="black"
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "5px",
                            right: "-5px",
                            width: "10px",
                            height: "10px",
                            backgroundColor: getStatusColor(item.userType),
                            // border: "1px solid white",
                            borderRadius: "50%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="users-heading-name users-data-item">
                      {item.name}
                    </p>
                    <p className="users-heading-mobile users-data-item">
                      {item.mobile}
                    </p>
                    <p className="users-heading-email users-data-item">
                      {item.email}
                    </p>
                    <p className="users-heading-created-on users-data-item">
                      {item.createdOn}
                    </p>
                    <div
                      className="users-data-option-div"
                      onClick={() => toggleMenu(item.id)} // Pass unique ID
                    >
                      <SlOptionsVertical size={12} />
                    </div>

                    {/* Popup Menu */}
                    {visibleMenuId === item.id &&
                      (currentUser.userType === "SUPER_ADMIN" ||
                        (currentUser.userType === "ORGANIZATIONAL_ADMIN" &&
                          item.userType !== "SUPER_ADMIN")) && (
                        <div className="popup-menu">
                          <p
                            className="popup-menu-item"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </p>
                          <p
                            className="popup-menu-item"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </>
        }

        <EditUserModal
          show={editUserModalVisible}
          close={() => setEditUserModalVisible(false)}
          userDetails={editUserDetails}
        ></EditUserModal>

        <DeleteUserModal
          show={deleteUserModalVisible}
          close={() => setdeleteUserModalVisible(false)}
          userDetails={deleteUserDetails}
        ></DeleteUserModal>
      </div>
    )
  );
};

export default UserData;
