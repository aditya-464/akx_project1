import React, { useEffect, useState } from "react";
import "./ResetPasswordForm.css";
import login_img from "../../assets/images/login2.webp";
import { useSelector, useDispatch } from "react-redux";
import {
  changePage,
  logout,
  setCurrentUser,
  setTenant,
  setTenantOptions,
} from "../../redux/page.js";
import LoginFormDropdown from "../LoginFormDropdown/LoginFormDropdown.jsx";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const { currentUser, tenant } = useSelector((state) => state.page);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [options, setOptions] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const passwordMatched = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      showErrorToast("Passwords do not match");
      return false;
    }
  };

  const isValidPassword = () => {
    if (password.length < 8) {
      showErrorToast("Password must contain atleast 8 characters");
      return false;
    }
    for (let i = 0; i < password.length; i++) {
      if (password[i] == " ") {
        showErrorToast("Password cannot contain blank space");
        return false;
      }
    }
    return true;
  };

  // const encrypt = (plainText, secretKey) => {
  //   const keyBytes = CryptoJS.enc.Utf8.parse(secretKey);
  //   const encrypted = CryptoJS.AES.encrypt(plainText, keyBytes, {
  //     mode: CryptoJS.mode.ECB,
  //   }).toString();
  //   return encrypted;
  // };

  const encrypt = (plainText, secretKey) => {
    const keyBytes = CryptoJS.enc.Utf8.parse(secretKey);
    const encrypted = CryptoJS.AES.encrypt(plainText, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7, // Ensure padding is applied
    }).toString();

    return encrypted; // Base64 encoded string
  };

  const handleReset = async () => {
    try {
      if (password !== "" && confirmPassword !== "") {
        if (Object.keys(currentUser).length === 0 || tenant === "") {
          showErrorToast("Invalid request");
          return;
        }
        if (!passwordMatched()) {
          return;
        }

        if (!isValidPassword()) {
          return;
        }

        const secretKey = "BxYfjlrtknZyVcjYT3MwPg==";
        const encryptedKey = encrypt(password, secretKey);

        const headers = {
          "X-TenantID": tenant,
        };

        const response = await axios.patch(
          `/userProfile?id=${currentUser.id}&newPass=${encryptedKey}`,
          { name: currentUser.name },
          { headers }
        );

        if (response.status === 200) {
          showSuccessToast(response.data.message);
          dispatch(logout());
          navigate("/login");
        }
      } else {
        showErrorToast("Please fill all fields");
      }
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  return (
    <div className="reset-password-form-container">
      <div className="reset-password-image-div">
        <img src={login_img}></img>
        <div className="black-overlay"></div>
      </div>
      <div className="reset-password-content-div">
        <div className="reset-password-content">
          <p className="reset-password-ask-text">Reset your password?</p>
          <p className="reset-password-text">We'll help you</p>

          <div className="reset-password-fields-group">
            <p>New password</p>
            <input
              className="reset-password-fields-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="reset-password-fields-group">
            <p>Confirm new password</p>
            <input
              className="reset-password-fields-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <div className="reset-password-button" onClick={handleReset}>
            <p>Reset</p>
          </div>
          <p
            className="cant-access-text"
            style={{
              display: "inline-block",
            }}
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Back to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
