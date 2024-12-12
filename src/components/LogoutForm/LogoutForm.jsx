import React from "react";
import "./LogoutForm.css";

const LogoutForm = () => {
  return (
    <div className="logout-container">
      <div className="logout-form">
        <p className="logout-ask-text">Are you sure, you wan't to logout?</p>
        <div className="logout-buttons-container">
          <div className="logout-yes-button">
            <p>Yes</p>
          </div>
          <div className="logout-no-button">
            <p>No</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutForm;
