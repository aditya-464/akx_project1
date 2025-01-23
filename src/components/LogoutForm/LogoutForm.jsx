import React from "react";
import "./LogoutForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changePage,
  logout,
  setCurrentUser,
  setHomeComponent,
  setTenant,
  setTenantOptions,
} from "../../redux/page";

const LogoutForm = ({ close }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(logout());
    navigate("/login");
    // dispatch(setCurrentUser({}));
    // dispatch(setTenant(""));
    // dispatch(setTenantOptions([]));
    // dispatch(setHomeComponent("dashboard"));
    // dispatch(changePage("login"));
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
