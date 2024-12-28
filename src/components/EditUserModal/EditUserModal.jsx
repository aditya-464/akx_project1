import React, { useEffect, useState } from "react";
import "./EditUserModal.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { refreshUser } from "../../redux/page";

const EditUserModal = ({ show, close, userDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    brandingLogo: null,
    userType: "USER",
  });
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newUser = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        brandingLogo:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      };

      const id = userDetails.id;
      const tenantID = "vmodaqa";

      const headers = {
        "X-TenantID": tenantID,
      };

      const response = await axios.patch(`/userProfile/${id}`, newUser, {
        headers,
      });

      if (response.status === 200) {
        dispatch(refreshUser());
      }

      handleCloseModal();
    } catch (error) {
      console.log(error.message);
      handleCloseModal();
    }
  };

  const handleInitialValuesFunc = () => {
    if (userDetails) {
      setFormData({
        name: userDetails.name,
        mobile: userDetails.mobile,
        email: userDetails.email,
        image: userDetails.image,
        createdAt: userDetails.createdAt,
      });
    }
  };

  const handleCloseModal = () => {
    close();
    setFormData({
      name: "",
      mobile: "",
      email: "",
      brandingLogo: null,
    });
    setImagePreview(null);
  };

  useEffect(() => {
    handleInitialValuesFunc();
  }, [userDetails]);

  if (!show) return null;

  return (
    <>
      <div className="popup-container">
        <div className="popup">
          <p id="edit-user-details-text">Enter User Details</p>
          <form onSubmit={handleSubmit} className="edit-user-popup-form">
            <div className="edit-user-fields-group">
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
            <div className="edit-user-buttons-div">
              <div className="edit-cancel-btn" onClick={close}>
                <p>Cancel</p>
              </div>
              <button type="submit" className="edit-submit-btn">
                <p>Update</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Overlay */}
      <div
        className="overlay"
        onClick={close} // Clicking outside closes the popup
      ></div>
    </>
  );
};

export default EditUserModal;
