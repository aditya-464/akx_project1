import React from "react";
import "./DeleteUserModal.css";

const DeleteUserModal = ({ show, close, userDetails }) => {
  if (!show) return null;

  return (
    <div className="delete-user-modal-overlay" onClick={close}>
      <div
        className="delete-user-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-user-modal-header">
          {/* <button className="close-btn" onClick={close}>
            x
          </button> */}
        </div>
        <div className="delete-user-modal-body">
          <div className="delete-user-form">
            <p className="delete-user-ask-text" style={{display : "flex"}}>
              Are you sure, you wan't to delete
              <p style={{ fontWeight: "600", marginLeft : "1rem" }}>{userDetails.name}</p>?
            </p>
            <div className="delete-user-buttons-container">
              <div className="delete-user-no-button" onClick={close}>
                <p>No</p>
              </div>
              <div className="delete-user-yes-button">
                <p>Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
