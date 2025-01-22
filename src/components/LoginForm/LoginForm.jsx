import React, { useEffect, useState } from "react";
import "./LoginForm.css";
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

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      }
      else{
        showErrorToast("Please fill all fields")
      }
    } catch (error) {
      console.log(error.response.data.message);
      
      showErrorToast(error.response.data.message);
    }
  };

  const handleSelect = (selectedOption) => {
    console.log("Selected:", selectedOption);
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
            <p>User</p>
            <input
              className="login-fields-input"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>

          {/* <div className="login-fields-group">
            <p>Select User</p>
            <LoginFormDropdown
              options={options}
              defaultValue={"vmodaqa"}
              returnValue={(val) => setDropdownVal(val)}
            ></LoginFormDropdown>
          </div> */}

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
