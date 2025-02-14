import React, { useEffect, useState } from "react";
import "./RecentUserData.css";
import { SlOptionsVertical } from "react-icons/sl";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import { ColorRing } from "react-loader-spinner";

const RecentUserData = ({ completeData }) => {
  // const { dummy_data } = props;

  const [actualData, setActualData] = useState(null);

  const [visibleMenuId, setVisibleMenuId] = useState(null); // Tracks the menu's visibility
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState("");
  const [deleteUserModalVisible, setdeleteUserModalVisible] = useState(false);
  const [deleteUserDetails, setDeleteUserDetails] = useState("");
  const { refreshUserCount } = useSelector((state) => state.page);
  const { currentUser, tenant } = useSelector((state) => state.page);

  // Toggle menu visibility for a specific item
  //   const toggleMenu = (id) => {
  //     setVisibleMenuId(visibleMenuId === id ? null : id);
  //   };

  // Close menu when clicked outside
  //   const handleOutsideClick = (e) => {
  //     if (
  //       !e.target.closest(".popup-menu") &&
  //       !e.target.closest(".recent-users-data-option-div")
  //     ) {
  //       setVisibleMenuId(null);
  //     }
  //   };

  //   useEffect(() => {
  //     document.addEventListener("click", handleOutsideClick);
  //     return () => document.removeEventListener("click", handleOutsideClick);
  //   }, []);

  // Edit handler
  //   const handleEdit = (item) => {
  //     // alert(`Edit user: ${user.name}`);
  //     setEditUserDetails(item);
  //     setEditUserModalVisible(true);
  //     setVisibleMenuId(null); // Close the menu
  //   };

  // Delete handler
  //   const handleDelete = (item) => {
  //     // alert(`Delete user: ${user.name}`);
  //     setDeleteUserDetails(item);
  //     setdeleteUserModalVisible(true);
  //     setVisibleMenuId(null); // Close the menu
  //   };

  // const showSuccessToast = (message) => {
  //   toast.success(message, {
  //     position: "bottom-center",
  //   });
  // };

  // const showErrorToast = (message) => {
  //   toast.error(message, {
  //     position: "bottom-center",
  //   });
  // };

  // const getActualData = async () => {
  //   try {
  //     const headers = {
  //       "X-TenantID": tenant,
  //     };

  //     // const response = await axios.get(url, { headers });
  //     const response = await axios.get("/userProfile", { headers });
  //     if (response.data.data) {
  //       setActualData(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     showErrorToast(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getActualData();
  // }, [refreshUserCount, tenant]);

  const getActualData = () => {
    setActualData(completeData.recentUser);
  };

  useEffect(() => {
    getActualData();
  }, [completeData]);

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
      <div id="recent-users-data-container">
        {
          <>
            <p className="recent-users-text">Recent users</p>

            <div id="recent-users-data-headings-div">
              <div id="recent-users-heading-checkbox"></div>
              <p className="recent-users-heading-id">Id</p>
              <p className="recent-users-heading-image">Image</p>
              <p className="recent-users-heading-name">Name</p>
              <p className="recent-users-heading-mobile">Mobile</p>
              <p className="recent-users-heading-email">Email</p>
              {/* <p className="recent-users-heading-created-on">Created At</p> */}
              {/* <div
                className="recent-users-data-option-div"
                style={{ visibility: "hidden" }}
              >
                <SlOptionsVertical size={12} />
              </div> */}
            </div>

            <div id="recent-users-data-partition-horizontal"></div>
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
              <div id="recent-users-data-content-div">
                {actualData.map((item) => (
                  <div key={item.id} className="recent-users-data-item-div">
                    <p className="recent-users-heading-id recent-users-data-item">
                      {item.id}
                    </p>
                    <div className="recent-users-heading-image recent-users-data-item">
                      {/* <img
                      className="recent-users-data-image"
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
                    <p className="recent-users-heading-name recent-users-data-item">
                      {item.name}
                    </p>
                    <p className="recent-users-heading-mobile recent-users-data-item">
                      {item.mobile}
                    </p>
                    <p className="recent-users-heading-email recent-users-data-item">
                      {item.email}
                    </p>
                    {/* <p className="recent-users-heading-created-on recent-users-data-item">
                      {item.createdOn}
                    </p> */}
                    {/* <div
                      className="recent-users-data-option-div"
                      onClick={() => toggleMenu(item.id)} // Pass unique ID
                    >
                      <SlOptionsVertical size={12} />
                    </div> */}

                    {/* Popup Menu */}
                    {/* {visibleMenuId === item.id && (
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
                    )} */}
                  </div>
                ))}
              </div>
            )}
          </>
        }

        {/* <EditUserModal
          show={editUserModalVisible}
          close={() => setEditUserModalVisible(false)}
          userDetails={editUserDetails}
        ></EditUserModal> */}

        {/* <DeleteUserModal
          show={deleteUserModalVisible}
          close={() => setdeleteUserModalVisible(false)}
          userDetails={deleteUserDetails}
        ></DeleteUserModal> */}
      </div>
    )
  );
};

export default RecentUserData;
