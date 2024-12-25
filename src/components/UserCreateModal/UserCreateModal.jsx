import React, { useState } from "react";
import "./UserCreateModal.css";

const UserCreateModal = ({ show, close }) => {
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

    // console.log(imagePreview);

    // Update the data state with the new user
    // setData((prevData) => [...prevData, newUser]);

    // Close the popup after submission
    setIsPopupVisible(false);

    // Reset form data
    // setFormData({
    //   name: "",
    //   mobile: "",
    //   email: "",
    //   image: null,
    //   createdAt: null,
    // });
    // setImagePreview(null);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    close();
    setFormData({
      name: "",
      mobile: "",
      email: "",
      image: null,
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
              <div type="submit" className="user-create-submit-btn">
                <p>Create</p>
              </div>
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
