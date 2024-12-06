import React, { useState } from "react";
import "./LoginForm.css";
import login_img from "../../assets/images/login2.webp";
import { useSelector, useDispatch } from "react-redux";
import { changePage, changeUsername } from "../../redux/page.js";
import LoginPageDropdown from "../LoginPageDropdown/LoginPageDropdown.jsx";
import LoginFormDropdown from "../LoginFormDropdown/LoginFormDropdown.jsx";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginFunction = () => {
    if (username != "" && password != "") {
      dispatch(changePage("otp"));
      dispatch(changeUsername(username));
    }
  };

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelect = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };

  return (
    <div className="login-form-container">
      <div className="login-image-div">
        <img src={login_img}></img>
        <div className="black-overlay"></div>
      </div>
      <div className="login-content-div">
        <div className="login-content">
          <p className="login-ask-text">Already have an account?</p>
          <p className="login-text">Sign in here</p>

          <div className="login-fields-group">
            <p>Username</p>
            <input
              className="login-fields-input"
              type="email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="login-fields-group">
            <p>Password</p>
            <input
              className="login-fields-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="login-fields-group">
            <p>Select User</p>
            {/* <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            /> */}
            {/* <LoginPageDropdown
              options={options}
              onSelect={handleSelect}
            ></LoginPageDropdown> */}
            <LoginFormDropdown></LoginFormDropdown>
          </div>

          {/* <div className="stay-logged-in-div">
            <input
              className="custom-checkbox"
              type="checkbox"
              value="gregory"
            />
            <p>Stay logged in</p>
          </div> */}

          <div className="login-button" onClick={loginFunction}>
            <p>Login</p>
          </div>

          <p className="cant-access-text">Can't access your account?</p>

          <div className="other-text-div">
            <p className="other-text">User Contract</p>
            <p className="vertical-partition">|</p>
            <p className="other-text">Privacy Policy</p>
          </div>
          <p className="copyright-text">
            Copyrights 2024 India, Inc. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
