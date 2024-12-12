import React, { useEffect, useState } from "react";
import "./DashboardMedia.css";
import "./Dashboard.css";
import UserData from "../../components/UserData/UserData";
import dummy_data from "../../assets/data/user_data.js";
import dummy_data_media from "../../assets/data/media_data.js";
import user_img from "../../assets/images/user.webp";
import { useSelector, useDispatch } from "react-redux";

import { IoFilter, IoSearch } from "react-icons/io5";
import { VscBellDot } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { MdPermMedia, MdLogout } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { GrTransaction } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";

import MediaData from "../../components/MediaData/MediaData.jsx";
import LoginFormDropdown from "../../components/LoginFormDropdown/LoginFormDropdown.jsx";
import NavbarDropdown from "../../components/NavbarDropdown/NavbarDropdown.jsx";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent.jsx";
import LogoutForm from "../../components/LogoutForm/LogoutForm.jsx";

const Dashboard = () => {
  // Function to toggle the popup
  // const [media, setMedia] = useState(true);
  // const [users, setUsers] = useState(false);
  const [search, setSearch] = useState("");
  const [dashboardComponent, setDashboardComponent] = useState("dashboard");
  const [data, setData] = useState("");
  const [data_media, setData_media] = useState("");
  const { username } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const options = [
    {
      id: 1,
      name: "Leanne Graham",
    },
    {
      id: 2,
      name: "Erin Howell",
    },
    {
      id: 3,
      name: "Alex Graham",
    },
  ];

  useEffect(() => {
    setData(dummy_data);
    setData_media(dummy_data_media);
  }, []);

  // dashboard search input field
  const handleSearchInput = (value) => {
    setSearch(value);
  };

  // media
  const [formMediaData, setFormMediaData] = useState({
    fileType: "",
    file: null,
  });
  const [fileMediaPreview, setFileMediaPreview] = useState(null);
  const [isMediaPopupVisible, setIsMediaPopupVisible] = useState(false);

  const toggleMediaPopup = () => {
    setIsMediaPopupVisible(!isMediaPopupVisible);
  };
  // media

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    image: null,
    createdAt: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile image upload
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

  // media functions -

  const handleMediaDropdownChange = (e) => {
    setFormMediaData((prev) => ({ ...prev, fileType: e.target.value }));
  };

  const handleMediaFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormMediaData((prev) => ({ ...prev, file }));
      if (formMediaData.fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => setFileMediaPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setFileMediaPreview(null); // No preview for non-image files
      }
    }
  };

  const getAcceptedMediaFileTypes = (type) => {
    switch (type) {
      case "image":
        return "image/*";
      case "pdf":
        return ".pdf";
      case "doc":
        return ".doc,.docx";
      case "excel":
        return ".xls,.xlsx";
      case "txt":
        return ".txt";
      default:
        return "";
    }
  };

  const handleMediaSubmit = (e) => {
    e.preventDefault();

    if (formMediaData.file) {
      let pdfFileView = "";
      if (formMediaData.fileType == "pdf") {
        URL.createObjectURL(formMediaData.file);
      }

      // Get the file size in a human-readable format (e.g., KB, MB)
      const fileSizeInBytes = formMediaData.file.size;
      const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2); // Size in MB, rounded to 2 decimal places

      // Create a new media object to store file details
      const newMedia = {
        id: data_media.length + 1, // Simple ID generation based on existing media
        name: formMediaData.file.name,
        type: formMediaData.fileType,
        size: fileSizeInMB + " MB", // Store file size in MB
        filePreview:
          formMediaData.fileType == "pdf" ? pdfFileView : fileMediaPreview, // Store the file preview for image types
        uploadedBy: "Admin",
        uploadedAt: new Date().toISOString(),
      };

      // Update the data_media state with the new media item
      setData_media((prevData) => [...prevData, newMedia]);

      // Show success message

      // Close the popup after submission
      toggleMediaPopup();
    } else {
      alert("Please select a file!");
    }
  };

  useEffect(() => {
    const dashboardDoc = document.getElementById("dashboard-dashboard-item");
    const userDoc = document.getElementById("dashboard-users-item");
    const mediaDoc = document.getElementById("dashboard-media-item");
    const logoutDoc = document.getElementById("dashboard-logout-item");

    if (dashboardComponent == "dashboard") {
      if (userDoc.classList.contains("active-navigation-item")) {
        userDoc.classList.remove("active-navigation-item");
      }
      if (mediaDoc.classList.contains("active-navigation-item")) {
        mediaDoc.classList.remove("active-navigation-item");
      }
      if (logoutDoc.classList.contains("active-navigation-item")) {
        logoutDoc.classList.remove("active-navigation-item");
      }
      dashboardDoc.classList.add("active-navigation-item");
    }
    if (dashboardComponent == "users") {
      if (dashboardDoc.classList.contains("active-navigation-item")) {
        dashboardDoc.classList.remove("active-navigation-item");
      }
      if (mediaDoc.classList.contains("active-navigation-item")) {
        mediaDoc.classList.remove("active-navigation-item");
      }
      if (logoutDoc.classList.contains("active-navigation-item")) {
        logoutDoc.classList.remove("active-navigation-item");
      }
      userDoc.classList.add("active-navigation-item");
    }
    if (dashboardComponent == "media") {
      if (dashboardDoc.classList.contains("active-navigation-item")) {
        dashboardDoc.classList.remove("active-navigation-item");
      }
      if (userDoc.classList.contains("active-navigation-item")) {
        userDoc.classList.remove("active-navigation-item");
      }
      if (logoutDoc.classList.contains("active-navigation-item")) {
        logoutDoc.classList.remove("active-navigation-item");
      }
      mediaDoc.classList.add("active-navigation-item");
    }
    if (dashboardComponent == "logout") {
      if (dashboardDoc.classList.contains("active-navigation-item")) {
        dashboardDoc.classList.remove("active-navigation-item");
      }
      if (userDoc.classList.contains("active-navigation-item")) {
        userDoc.classList.remove("active-navigation-item");
      }
      if (mediaDoc.classList.contains("active-navigation-item")) {
        mediaDoc.classList.remove("active-navigation-item");
      }
      logoutDoc.classList.add("active-navigation-item");
    }
  }, [dashboardComponent]);

  return (
    <div id="dashboard-container">
      <div id="dashboard-navigation-div">
        <div id="company-details">DSMS</div>
        {/* <div className="partition-line"></div> */}
        <div id="dashboard-navigation-list-div">
          <div
            id="dashboard-dashboard-item"
            className="dashboard-navigation-item"
            onClick={() => {
              setDashboardComponent("dashboard");
            }}
          >
            <div className="dashboard-navigation-icons">
              <AiFillHome size={14} color={"white"}></AiFillHome>
            </div>
            <p>Dashboard</p>
          </div>
          <div
            id="dashboard-users-item"
            className="dashboard-navigation-item"
            onClick={() => {
              setDashboardComponent("users");
            }}
          >
            <div className="dashboard-navigation-icons">
              <FaUser size={14} color="white"></FaUser>
            </div>
            <p>Users</p>
          </div>
          <div
            id="dashboard-media-item"
            className="dashboard-navigation-item"
            onClick={() => {
              setDashboardComponent("media");
            }}
          >
            <div className="dashboard-navigation-icons">
              <MdPermMedia size={14} color="white"></MdPermMedia>
            </div>
            <p>Media</p>
          </div>
          <div
            id="dashboard-logout-item"
            className="dashboard-navigation-item"
            onClick={() => {
              setDashboardComponent("logout");
            }}
          >
            <div className="dashboard-navigation-icons">
              <SlLogout size={14} color="white"></SlLogout>
            </div>
            <p>Logout</p>
          </div>
          {/* <div className="dashboard-navigation-item">
            <div className="dashboard-navigation-icons">
              <IoMdSettings size={14} color="white"></IoMdSettings>
            </div>
            <p>Settings</p>
          </div> */}
        </div>
      </div>
      <div id="dashboard-content-div">
        <div id="dashboard-content-navbar">
          <div
            className="dashboard-nav-searchbar"
            style={{
              visibility:
                dashboardComponent == "users" || dashboardComponent == "media"
                  ? "visible"
                  : "hidden",
            }}
          >
            <input
              className="dashboard-search-input"
              placeholder="Search here..."
              value={search}
              onChange={(e) => {
                handleSearchInput(e.target.value);
              }}
            ></input>
            <IoSearch size={14} color="#5e6a72"></IoSearch>
          </div>
          <div
            className="dashboard-navbar-right-side"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              className="dashboard-navbar-dropdown"
              style={{
                visibility:
                  dashboardComponent == "users" || dashboardComponent == "media"
                    ? "visible"
                    : "hidden",
              }}
            >
              <NavbarDropdown options={options}></NavbarDropdown>
            </div>
            <div className="bell-icon">
              <VscBellDot size={24}></VscBellDot>
            </div>
            <div id="navbar-admin-details">
              <div id="navbar-admin-logo">
                <img src={user_img} alt="" />
              </div>
              <div id="navbar-admin-text">
                <p id="admin-username">{username}</p>
                <p id="admin-fullname">John Doe</p>
              </div>
            </div>
          </div>
        </div>
        <div id="dashboard-content-details">
          {/* <div id="dashboard-content-user-graph-div"></div> */}

          {dashboardComponent == "dashboard" && (
            <DashboardComponent></DashboardComponent>
          )}

          {dashboardComponent == "users" && (
            <div className="dashboard-user">
              <div id="dashboard-content-today-details-div">
                <p id="users-text">Users</p>
                <div className="dashboard-user-buttons">
                  <div id="dashboard-filter-button">
                    <IoFilter size={14} />

                    <p>Filter</p>
                  </div>
                  <div onClick={togglePopup} id="dashboard-create-user-button">
                    <p>Create User</p>
                  </div>
                </div>
              </div>

              {/* pop-up */}
              {isPopupVisible && (
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
                        <button type="submit" className="submit-btn">
                          <p>Create User</p>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div
                    className="overlay"
                    onClick={togglePopup} // Clicking outside closes the popup
                  ></div>
                </>
              )}

              <div id="dashboard-content-user-details-div">
                {data && <UserData dummy_data={data}></UserData>}
              </div>
            </div>
          )}

          {dashboardComponent == "media" && (
            <div className="dashboard-media">
              <div id="dashboard-content-today-details-div">
                <p id="users-text">Media</p>
                <div className="dashboard-user-buttons">
                  <div id="dashboard-filter-button">
                    <IoFilter size={14} />
                    <p>Filters</p>
                  </div>
                  <div
                    onClick={toggleMediaPopup}
                    id="dashboard-create-media-button"
                  >
                    <p>Upload Media</p>
                  </div>
                </div>
              </div>

              {/* Pop-up */}
              {isMediaPopupVisible && (
                <>
                  <div className="popup-container-media">
                    <div className="popup-media">
                      <p id="upload-media-text">Upload Media</p>
                      <form
                        onSubmit={handleMediaSubmit}
                        className="popup-form-media"
                      >
                        <div>
                          <p>Select File Format</p>
                          <select
                            name="fileType"
                            value={formMediaData.fileType}
                            onChange={handleMediaDropdownChange}
                            className="input-field-media"
                          >
                            <option value="">-- Select File Format --</option>
                            <option value="image">Image</option>
                            <option value="pdf">PDF</option>
                            <option value="doc">Word Document</option>
                            <option value="excel">Excel</option>
                            <option value="txt">Text File</option>
                          </select>
                        </div>
                        <div>
                          <p className="file-label-media">Choose File</p>
                          <input
                            type="file"
                            accept={getAcceptedMediaFileTypes(
                              formMediaData.fileType
                            )}
                            onChange={handleMediaFileChange}
                            className="input-field-media"
                          />
                          {fileMediaPreview && (
                            <div className="media-preview-container">
                              {formMediaData.fileType === "image" && (
                                <img
                                  src={fileMediaPreview}
                                  alt="Media Preview"
                                  className="media-img-preview"
                                />
                              )}
                              {formMediaData.fileType !== "image" && (
                                <p className="media-doc-preview">
                                  Selected File:{" "}
                                  {formMediaData.file?.name ||
                                    "No file selected"}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                        <button type="submit" className="submit-btn-media">
                          <p>Upload Media</p>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div
                    className="overlay-media"
                    onClick={toggleMediaPopup} // Clicking outside closes the popup
                  ></div>
                </>
              )}

              <div id="dashboard-content-user-details-div">
                {data_media && (
                  <MediaData dummy_data_media={data_media}></MediaData>
                )}
              </div>
            </div>
          )}

          {dashboardComponent == "logout" && <LogoutForm></LogoutForm>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
