import React from "react";
import "./LogoutForm.css";
import { useNavigate } from "react-router-dom";

const LogoutForm = ({ close }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <div className="logout-container">
      <div className="logout-form">
        <p className="logout-ask-text">Are you sure you want to log out?</p>
        <div className="logout-buttons-container">
          <div className="logout-yes-button" onClick={handleLogout}>
            <p>Yes</p>
          </div>
          <div className="logout-no-button" onClick={close}>
            <p>No</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutForm;
