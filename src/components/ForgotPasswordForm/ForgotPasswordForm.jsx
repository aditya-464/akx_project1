import React, { useEffect, useState } from "react";
import "./ForgotPasswordForm.css";
import login_img from "../../assets/images/login2.webp";
import { useSelector, useDispatch } from "react-redux";
import {
  changePage,
  setCurrentUser,
  setTenant,
  setTenantOptions,
} from "../../redux/page.js";
import LoginFormDropdown from "../LoginFormDropdown/LoginFormDropdown.jsx";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  // const [dropdownVal, setDropdownVal] = useState("");
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

  const isValidUser = () => {
    if (options !== null) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].name === user) {
          return true;
        }
      }
      showErrorToast("Invalid user");
      return false;
    }
    return false;
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

  const loginFunction = async () => {
    try {
      if (username != "" && password != "" && user != "") {
        if (!isValidUser()) {
          return;
        }
        // const secretKey = import.meta.env.VITE_SECRET_KEY;
        const secretKey = "BxYfjlrtknZyVcjYT3MwPg==";
        const encryptedKey = encrypt(password, secretKey);

        const headers = {
          "X-TenantID": user,
        };
        const loginData = {
          email: username,
          password: encryptedKey,
        };

        const response = await axios.post("/userProfile/auth", loginData, {
          headers,
        });

        if (response.status === 200) {
          sessionStorage.setItem("tenant", user);
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(response.data.data)
          );

          // console.log(response.data.data);
          dispatch(setCurrentUser(response.data.data));
          dispatch(setTenant(user));
          dispatch(changePage("otp"));
          navigate("/otp");
        }
      } else {
        showErrorToast("Please fill all fields");
      }
    } catch (error) {
      console.log(error.response.data.message);

      showErrorToast(error.response.data.message);
    }
  };

  const handleProceed = async () => {
    try {
      if (user !== "" && username !== "" && options !== null) {
        if (!isValidUser()) {
          return;
        }
        // navigate("/otp", {
        //   state: { forgotPassword: true },
        // });
        navigate("/reset-password");
      } else {
        showErrorToast("Please fill all fields");
      }
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  const getTenantOptions = async () => {
    try {
      const headers = {
        "X-TenantID": "dsms",
      };

      const response = await axios.get("/config", {
        headers,
      });

      if (response.status === 200) {
        let arr = [];
        for (let i = 0; i < response.data.data.length; i++) {
          let obj = {
            id: response.data.data[i].id,
            name: response.data.data[i].tenantName,
          };
          arr.push(obj);
        }
        sessionStorage.setItem("tenantOptions", JSON.stringify(arr));
        dispatch(setTenantOptions(arr));
        setOptions(arr);
      }
    } catch (error) {
      // console.log(error.message);
      showErrorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    getTenantOptions();
  }, []);

  return (
    <div className="forgot-password-form-container">
      <div className="forgot-password-image-div">
        <img src={login_img}></img>
        <div className="black-overlay"></div>
      </div>
      <div className="forgot-password-content-div">
        <div className="forgot-password-content">
          <p className="forgot-password-ask-text">Forgot your password?</p>
          <p className="forgot-password-text">We'll help you</p>

          <div className="forgot-password-fields-group">
            <p>Username</p>
            <input
              className="forgot-password-fields-input"
              type="email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="forgot-password-fields-group">
            <p>User</p>
            <input
              className="forgot-password-fields-input"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>

          <div className="forgot-password-button" onClick={handleProceed}>
            <p>Proceed</p>
          </div>
          <p
            className="cant-access-text"
            onClick={() => {
              // navigate("/otp", {
              //   state: { forgetPassword: true },
              // });
              navigate("/login");
            }}
          >
            Remember your password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
