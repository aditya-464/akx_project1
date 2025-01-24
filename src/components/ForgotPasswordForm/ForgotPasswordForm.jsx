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
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
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

  const handleProceed = async () => {
    try {
      if (user !== "" && username !== "" && options !== null) {
        if (!isValidUser()) {
          return;
        }

        const headers = {
          "X-TenantID": user,
        };

        const response = await axios.get(
          `/userProfile/forgetPassword?email=${username}`,
          { headers }
        );

        if (response.status === 200) {
          dispatch(setCurrentUser(response.data.data));
          dispatch(setTenant(user));
          dispatch(changePage("otp"));
          navigate("/otp", {
            state: { forgotPassword: true },
          });
        }
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
            style={{
              display: "inline-block",
            }}
            onClick={() => {
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

export default ForgotPasswordForm;
