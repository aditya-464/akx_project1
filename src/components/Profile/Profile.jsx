import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refreshMedia, setCurrentUser } from "../../redux/page";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";

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

        const updatedData = {
          name,
          mobile,
        };

        const response = await axios.patch(
          `/userProfile/${currentUser.id}`,
          updatedData,
          {
            headers,
          }
        );

        if (response.status === 200) {
          handleClose();
          showSuccessToast(response.data.message);
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(response.data.data)
          );
          dispatch(setCurrentUser(response.data.data));
        }
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
  };

  const handleCancel = () => {
    setName(currentUser.name);
    setMobile(currentUser.mobile);
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
          {/* <div className="profile-fields-group">
            <div
              className="profile-field"
              style={{ paddingRight: "2rem" }}
            >
              <p className="profile-field-heading">Uploaded By</p>
              <input
                type="text"
                name="uploaded-by"
                value={uploadedByName}
                onChange={(e) => {
                  setUploadedByName(e.target.value);
                }}
                className="profile-input-field"
              />
            </div>
            <div className="profile-field">
              <p className="profile-field-heading">Approved By</p>
              <input
                type="text"
                name="approved-by"
                value={approvedByName}
                onChange={(e) => {
                  setApprovedByName(e.target.value);
                }}
                // placeholder="Enter Name"
                className="profile-input-field"
              />
            </div>
          </div> */}

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
