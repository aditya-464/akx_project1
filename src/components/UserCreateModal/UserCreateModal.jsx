import React, { useState } from "react";
import "./UserCreateModal.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/page";
import { toast } from "react-toastify";

const UserCreateModal = ({ show, close }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    brandingLogo: null,
    userType: "USER",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { currentUser, tenant } = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newUser = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        // brandingLogo: imagePreview,
        brandingLogo:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        userType: "USER",
      };

      // const url = "http://84.247.171.46:8080/userProfile";
      // const tenantID = "vmodaqa";

      const headers = {
        "X-TenantID": tenant,
      };

      // const response = await axios.get(url, { headers });
      const response = await axios.post("/userProfile", newUser, { headers });

      if (response.status === 201) {
        showSuccessToast(response.data.message);
        dispatch(refreshUser());
      }

      handleCloseModal();
    } catch (error) {
      console.log(error.message);
      showErrorToast(error.message);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    close();
    setFormData({
      name: "",
      mobile: "",
      email: "",
      brandingLogo: null,
      createdAt: null,
    });
    setImagePreview(null);
  };

  if (!show) return null;

  return (
    <>
      <div className="popup-container">
        <div className="popup">
          <p id="enter-user-details-text">Enter User Details</p>
          <form onSubmit={handleSubmit} className="popup-form">
            <div className="login-fields-group-user">
              <p>Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                // placeholder="Enter your name"
                required
                className="input-field"
              />
              <p>Mobile</p>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                // placeholder="Enter your mobile number"
                required
                className="input-field"
              />
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                // placeholder="Enter your email"
                required
                className="input-field"
              />
            </div>
            <div>
              <p className="file-label">Choose Profile Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input-field"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="profile-img-preview"
                />
              )}
            </div>

            {/* <button type="submit" className="submit-btn">
            <p>Create User</p>
          </button> */}
            <div className="user-create-buttons-div">
              <div
                className="user-create-cancel-btn"
                onClick={handleCloseModal}
              >
                <p>Cancel</p>
              </div>
              <button type="submit" className="user-create-submit-btn">
                <p>Create</p>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Overlay */}
      <div
        className="overlay"
        onClick={handleCloseModal} // Clicking outside closes the popup
      ></div>
    </>
  );
};

export default UserCreateModal;
