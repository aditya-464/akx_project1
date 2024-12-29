import React, { useEffect, useState } from "react";
import "./UserData.css";
import { SlOptionsVertical } from "react-icons/sl";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const UserData = (props) => {
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
      // const url = "http://84.247.171.46:8080/userProfile";
      // const tenantID = "vmodaqa";

      const headers = {
        "X-TenantID": tenant,
      };

      // const response = await axios.get(url, { headers });
      const response = await axios.get("/userProfile", { headers });
      if (response.data.data) {
        setActualData(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    getActualData();
  }, [refreshUserCount]);

  return (
    actualData && (
      <div id="users-data-container">
        {
          <>
            <div id="users-data-headings-div">
              <div id="users-heading-checkbox"></div>
              <p className="users-heading-id">Id</p>
              <p className="users-heading-image">Image</p>
              <p className="users-heading-name">Name</p>
              <p className="users-heading-mobile">Mobile</p>
              <p className="users-heading-email">Email</p>
              <p className="users-heading-created-on">Created At</p>
              <div
                className="users-data-option-div"
                style={{ visibility: "hidden" }}
              >
                <SlOptionsVertical size={12} />
              </div>
            </div>

            <div id="users-data-partition-horizontal"></div>
            <div id="users-data-content-div">
              {actualData.map((item) => (
                <div key={item.id} className="users-data-item-div">
                  <p className="users-heading-id users-data-item">{item.id}</p>
                  <div className="users-heading-image users-data-item">
                    <img
                      className="users-data-image"
                      // src={
                      //   item.brandingLogo ||
                      //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      // }
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt={item.name}
                    />
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
                  {visibleMenuId === item.id && (
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
