import React, { useEffect, useState } from "react";
import "./EditUserModal.css";

const EditUserModal = ({ show, close, userDetails }) => {
  if (!show) return null;

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    image: null,
    createdAt: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new user object with the form data
    const newUser = {
      id: data.length + 1, // Simple ID generation
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      image: imagePreview, // Store the image preview as the URL
      createdAt: new Date().toISOString(),
    };

    console.log(imagePreview);

    // Update the data state with the new user
    setData((prevData) => [...prevData, newUser]);

    // Close the popup after submission
    setIsPopupVisible(false);

    // Reset form data
    setFormData({
      name: "",
      mobile: "",
      email: "",
      image: null,
      createdAt: null,
    });
    setImagePreview(null);
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

  useEffect(() => {
    handleInitialValuesFunc();
  }, [userDetails]);

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
              <div type="submit" className="edit-submit-btn">
                <p>Update</p>
              </div>
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
