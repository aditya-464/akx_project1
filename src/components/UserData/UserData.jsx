import React, { useEffect, useState } from "react";
import "./UserData.css";
import { SlOptionsVertical } from "react-icons/sl";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";

const UserData = (props) => {
  const { dummy_data } = props;

  const [visibleMenuId, setVisibleMenuId] = useState(null); // Tracks the menu's visibility
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState("");
  const [deleteUserModalVisible, setdeleteUserModalVisible] = useState(false);
  const [deleteUserDetails, setDeleteUserDetails] = useState("");

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

  return (
    <div id="users-data-container">
      {dummy_data && (
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
            {dummy_data.map((item) => (
              <div key={item.id} className="users-data-item-div">
                <p className="users-heading-id users-data-item">{item.id}</p>
                <div className="users-heading-image users-data-item">
                  <img
                    className="users-data-image"
                    src={item.image || "https://via.placeholder.com/40"} // Default placeholder if no image
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
                  {item.createdAt}
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
      )}

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
  );
};

export default UserData;
