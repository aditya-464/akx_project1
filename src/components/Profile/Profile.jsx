import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refreshMedia, setCurrentUser } from "../../redux/page";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";
import CryptoJS from "crypto-js";

const options = [
  "Most Recent",
  "Least Recent",
  "Approved",
  "Not Approved",
  "Image",
  "Document",
  "Audio",
  "Video",
];

const Profile = ({ show, close }) => {
  const { currentUser, tenant } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [profileImage, setProfileImage] = useState(null); // State to store selected image

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);

      // Optionally display the selected image
      const reader = new FileReader();
      reader.onload = () => {
        document.querySelector(".profile-image-container img").src =
          reader.result;
      };
      reader.readAsDataURL(file);
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

  const encrypt = (plainText, secretKey) => {
    const keyBytes = CryptoJS.enc.Utf8.parse(secretKey);
    const encrypted = CryptoJS.AES.encrypt(plainText, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7, // Ensure padding is applied
    }).toString();

    return encrypted; // Base64 encoded string
  };

  const handleUpdateProfile = async () => {
    try {
      if (name !== "" && mobile !== "") {
        const headers = {
          "X-TenantID": tenant,
        };
        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("mobile", mobile);
        // if (profileImage) {
        //     formData.append("profileImage", profileImage);
        // }

        let msg1 = null,
          msg2 = null;

        const updatedData = {
          name,
          mobile,
        };

        if (password !== "") {
          if (!isValidPassword()) {
            return;
          }

          const secretKey = "BxYfjlrtknZyVcjYT3MwPg==";
          const encryptedKey = encrypt(password, secretKey);

          const response1 = await axios.patch(
            `/userProfile?id=${currentUser.id}&newPass=${encryptedKey}`,
            { name: currentUser.name },
            { headers }
          );

          if (response1.status === 200) {
            msg1 = response1.data.message;
            handleClose();
          }
        }

        if (name !== currentUser.name || mobile !== currentUser.mobile) {
          const response2 = await axios.patch(
            `/userProfile/${currentUser.id}`,
            updatedData,
            {
              headers,
            }
          );

          if (response2.status === 200) {
            msg2 = response2.data.message;
            handleClose();
            sessionStorage.setItem(
              "currentUser",
              JSON.stringify(response2.data.data)
            );
            dispatch(setCurrentUser(response2.data.data));
          }
        }

        if (msg1 !== null && msg2 !== null) {
          showSuccessToast(msg2 + " and " + msg1);
        }
        if (msg1 !== null && msg2 === null) {
          showSuccessToast(msg1);
        }
        if (msg1 === null && msg2 !== null) {
          showSuccessToast(msg2);
        }
      } else {
        showErrorToast("Field(s) cannot be empty");
      }
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    setName(currentUser.name);
    setMobile(currentUser.mobile);
  }, [currentUser]);

  const handleClose = () => {
    setIsDisabled(true);
    close();
    setPassword("");
  };

  const handleCancel = () => {
    setName(currentUser.name);
    setMobile(currentUser.mobile);
    setPassword("");
    setProfileImage(null);
    setIsDisabled(true);
    close();
  };

  const getUserTagColor = () => {
    if (currentUser.userType === "USER") {
      return "blue";
    } else if (currentUser.userType === "SUPER_ADMIN") {
      return "orange";
    } else {
      return "green";
    }
  };

  if (!show) return <></>;

  return (
    <>
      <div className="profile-container">
        <div className="profile-popup">
          <p id="filter-media-details-text">User Profile</p>

          <div className="profile-image-container">
            <img src={currentUser.brandingLogo} alt="profile_image" />
            <div
              style={{
                position: "relative",
                backgroundColor: getUserTagColor(),
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                right: "25px",
                bottom: "25px",
              }}
            ></div>
            {/* <div
              className="profile-image-update-button"
              onClick={() => {
                if (!isDisabled) {
                  document.getElementById("imageUpload").click();
                }
              }}
              style={{ display: "none" }}
            >
              <FaCamera size={20} color="#36454f"></FaCamera>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div> */}
          </div>

          <div className="profile-fields-group">
            <div className="profile-field" style={{ paddingRight: "2rem" }}>
              <p className="profile-field-heading">Name</p>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="profile-input-field"
                disabled={isDisabled}
              />
            </div>
            <div className="profile-field">
              <p className="profile-field-heading">Mobile</p>
              <input
                type="text"
                name="mobile"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                // placeholder="Enter Name"
                className="profile-input-field"
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="profile-fields-group">
            <div className="profile-field" style={{ paddingRight: "2rem" }}>
              <p className="profile-field-heading">Email</p>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                disabled={true}
                className="profile-input-field"
                style={{
                  cursor: "not-allowed",
                }}
              />
            </div>
            <div className="profile-field">
              <p className="profile-field-heading">Password</p>
              <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="**********"
                className="profile-input-field"
                disabled={isDisabled}
              />
            </div>
          </div>

          {/* <div className="profile-checkbox-group">
            {options.map((option, index) => (
              <div className="profile-checkbox" key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions[option]}
                    onChange={handleChangeCheckBox}
                  />
                  <span className="profile-checkbox-name">{option}</span>
                </label>
              </div>
            ))}
          </div> */}

          {isDisabled && (
            <div className="profile-buttons-div">
              <div
                className="profile-clear-btn"
                style={{ marginRight: "2rem", visibility: "hidden" }}
              >
                <p>Clear All</p>
              </div>
              <button
                type="submit"
                className="profile-apply-btn"
                onClick={() => {
                  setIsDisabled(false);
                }}
              >
                <p>Update Profile</p>
              </button>
            </div>
          )}

          {!isDisabled && (
            <div className="profile-buttons-div">
              <div
                className="profile-clear-btn"
                style={{ marginRight: "2rem" }}
                onClick={() => handleCancel()}
              >
                <p>Cancel</p>
              </div>
              <button
                type="submit"
                className="profile-apply-btn"
                onClick={() => {
                  setIsDisabled(false);
                  handleUpdateProfile();
                }}
              >
                <p>Update</p>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      <div className="overlay" onClick={handleCancel}></div>
    </>
  );
};

export default Profile;
