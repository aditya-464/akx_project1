import React, { useEffect, useState } from "react";
import "./DashboardMedia.css";
import "./Dashboard.css";
import UserData from "../../components/UserData/UserData";
import dummy_data from "../../assets/data/user_data.js";
import dummy_data_media from "../../assets/data/media_data.js";
import user_img from "../../assets/images/user.webp";
import { useSelector, useDispatch } from "react-redux";

import { IoFilter, IoSearch } from "react-icons/io5";
// import { VscBellDot } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

import MediaData from "../../components/MediaData/MediaData.jsx";
import LoginFormDropdown from "../../components/LoginFormDropdown/LoginFormDropdown.jsx";
import NavbarDropdown from "../../components/NavbarDropdown/NavbarDropdown.jsx";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent.jsx";
import LogoutForm from "../../components/LogoutForm/LogoutForm.jsx";
import UserCreateModal from "../../components/UserCreateModal/UserCreateModal.jsx";
import UploadMediaModal from "../../components/UploadMediaModal/UploadMediaModal.jsx";
import { setTenant } from "../../redux/page.js";
import UserDataFilterModal from "../../components/UserDataFilterModal/UserDataFilterModal.jsx";
import MediaDataFilterModal from "../../components/MediaDataFilterModal/MediaDataFilterModal.jsx";
import Profile from "../../components/Profile/Profile.jsx";

const Dashboard = () => {
  // Function to toggle the popup
  // const [media, setMedia] = useState(true);
  // const [users, setUsers] = useState(false);
  const { currentUser, tenant, homeComponent } = useSelector(
    (state) => state.page
  );
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dashboardComponent, setDashboardComponent] = useState(homeComponent);
  const [data, setData] = useState("");
  const [data_media, setData_media] = useState("");
  const [userFilterApi, setUserFilterApi] = useState(null);
  const [mediaFilterApi, setMediaFilterApi] = useState(null);
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [userFilterModalVisible, setUserFilterModalVisible] = useState(false);
  const [uploadMediaModalVisible, setUploadMediaModalVisible] = useState(false);
  const [mediaFilterModalVisible, setMediaFilterModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(dummy_data);
    setData_media(dummy_data_media);
  }, []);

  // dashboard search input field
  const handleSearchInput = (value) => {
    setSearch(value);
  };

  // media
  // const [formMediaData, setFormMediaData] = useState({
  //   fileType: "",
  //   file: null,
  // });
  // const [fileMediaPreview, setFileMediaPreview] = useState(null);
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

  const handleCreateUserFunc = () => {
    setCreateUserModalVisible(true);
  };

  const handleUserFilterVisibility = () => {
    setUserFilterModalVisible(true);
  };

  const handleUploadMediaFunc = () => {
    setUploadMediaModalVisible(true);
  };

  const handleMediaFilterVisibility = () => {
    setMediaFilterModalVisible(true);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Handle form input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // Handle profile image upload
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       profileImage: file,
  //     }));
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Create a new user object with the form data
  //   const newUser = {
  //     id: data.length + 1, // Simple ID generation
  //     name: formData.name,
  //     mobile: formData.mobile,
  //     email: formData.email,
  //     image: imagePreview, // Store the image preview as the URL
  //     createdAt: new Date().toISOString(),
  //   };

  //   console.log(imagePreview);

  //   // Update the data state with the new user
  //   setData((prevData) => [...prevData, newUser]);

  //   // Close the popup after submission
  //   setIsPopupVisible(false);

  //   // Reset form data
  //   setFormData({
  //     name: "",
  //     mobile: "",
  //     email: "",
  //     image: null,
  //     createdAt: null,
  //   });
  //   setImagePreview(null);
  // };

  // media functions -

  // const handleMediaDropdownChange = (e) => {
  //   setFormMediaData((prev) => ({ ...prev, fileType: e.target.value }));
  // };

  // const handleMediaFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormMediaData((prev) => ({ ...prev, file }));
  //     if (formMediaData.fileType === "image") {
  //       const reader = new FileReader();
  //       reader.onloadend = () => setFileMediaPreview(reader.result);
  //       reader.readAsDataURL(file);
  //     } else {
  //       setFileMediaPreview(null); // No preview for non-image files
  //     }
  //   }
  // };

  // const getAcceptedMediaFileTypes = (type) => {
  //   switch (type) {
  //     case "image":
  //       return "image/*";
  //     case "pdf":
  //       return ".pdf";
  //     case "doc":
  //       return ".doc,.docx";
  //     case "excel":
  //       return ".xls,.xlsx";
  //     case "txt":
  //       return ".txt";
  //     default:
  //       return "";
  //   }
  // };

  // const handleMediaSubmit = (e) => {
  //   e.preventDefault();

  //   if (formMediaData.file) {
  //     let pdfFileView = "";
  //     if (formMediaData.fileType == "pdf") {
  //       pdfFileView = URL.createObjectURL(formMediaData.file);
  //     }

  //     // Get the file size in a human-readable format (e.g., KB, MB)
  //     const fileSizeInBytes = formMediaData.file.size;
  //     const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2); // Size in MB, rounded to 2 decimal places

  //     // Create a new media object to store file details
  //     const newMedia = {
  //       id: data_media.length + 1, // Simple ID generation based on existing media
  //       name: formMediaData.file.name,
  //       type: formMediaData.fileType,
  //       size: fileSizeInMB + " MB", // Store file size in MB
  //       filePreview:
  //         formMediaData.fileType == "pdf" ? pdfFileView : fileMediaPreview, // Store the file preview for image types
  //       uploadedBy: "Admin",
  //       uploadedAt: new Date().toISOString(),
  //     };

  //     // Update the data_media state with the new media item
  //     setData_media((prevData) => [...prevData, newMedia]);

  //     // Show success message

  //     // Close the popup after submission
  //     toggleMediaPopup();
  //   } else {
  //     alert("Please select a file!");
  //   }
  // };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const handleProfileModalVisible = () => {
    setProfileModalVisible(true);
  };

  // useEffect(() => {
  //   const dashboardDoc = document.getElementById("dashboard-dashboard-item");
  //   const userDoc = document.getElementById("dashboard-users-item");
  //   const mediaDoc = document.getElementById("dashboard-media-item");
  //   const logoutDoc = document.getElementById("dashboard-logout-item");

  //   if (dashboardComponent == "dashboard") {
  //     if (userDoc.classList.contains("active-navigation-item")) {
  //       userDoc.classList.remove("active-navigation-item");
  //     }
  //     if (mediaDoc.classList.contains("active-navigation-item")) {
  //       mediaDoc.classList.remove("active-navigation-item");
  //     }
  //     if (logoutDoc.classList.contains("active-navigation-item")) {
  //       logoutDoc.classList.remove("active-navigation-item");
  //     }
  //     dashboardDoc.classList.add("active-navigation-item");
  //   }
  //   if (dashboardComponent == "users") {
  //     if (dashboardDoc.classList.contains("active-navigation-item")) {
  //       dashboardDoc.classList.remove("active-navigation-item");
  //     }
  //     if (mediaDoc.classList.contains("active-navigation-item")) {
  //       mediaDoc.classList.remove("active-navigation-item");
  //     }
  //     if (logoutDoc.classList.contains("active-navigation-item")) {
  //       logoutDoc.classList.remove("active-navigation-item");
  //     }
  //     userDoc.classList.add("active-navigation-item");
  //   }
  //   if (dashboardComponent == "media") {
  //     if (dashboardDoc.classList.contains("active-navigation-item")) {
  //       dashboardDoc.classList.remove("active-navigation-item");
  //     }
  //     if (userDoc.classList.contains("active-navigation-item")) {
  //       userDoc.classList.remove("active-navigation-item");
  //     }
  //     if (logoutDoc.classList.contains("active-navigation-item")) {
  //       logoutDoc.classList.remove("active-navigation-item");
  //     }
  //     mediaDoc.classList.add("active-navigation-item");
  //   }
  //   if (dashboardComponent == "logout") {
  //     if (dashboardDoc.classList.contains("active-navigation-item")) {
  //       dashboardDoc.classList.remove("active-navigation-item");
  //     }
  //     if (userDoc.classList.contains("active-navigation-item")) {
  //       userDoc.classList.remove("active-navigation-item");
  //     }
  //     if (mediaDoc.classList.contains("active-navigation-item")) {
  //       mediaDoc.classList.remove("active-navigation-item");
  //     }
  //     logoutDoc.classList.add("active-navigation-item");
  //   }
  // }, [dashboardComponent]);

  useEffect(() => {
    const dashboardDoc = document.getElementById("dashboard-dashboard-item");
    const userDoc = document.getElementById("dashboard-users-item");
    const mediaDoc = document.getElementById("dashboard-media-item");
    const logoutDoc = document.getElementById("dashboard-logout-item");

    if (dashboardComponent === "dashboard" && dashboardDoc) {
      userDoc?.classList.remove("active-navigation-item");
      mediaDoc?.classList.remove("active-navigation-item");
      logoutDoc?.classList.remove("active-navigation-item");
      dashboardDoc.classList.add("active-navigation-item");
    }
    if (dashboardComponent === "users" && userDoc) {
      dashboardDoc?.classList.remove("active-navigation-item");
      mediaDoc?.classList.remove("active-navigation-item");
      logoutDoc?.classList.remove("active-navigation-item");
      userDoc.classList.add("active-navigation-item");
    }
    if (dashboardComponent === "media" && mediaDoc) {
      dashboardDoc?.classList.remove("active-navigation-item");
      userDoc?.classList.remove("active-navigation-item");
      logoutDoc?.classList.remove("active-navigation-item");
      mediaDoc.classList.add("active-navigation-item");
    }
    if (dashboardComponent === "logout" && logoutDoc) {
      dashboardDoc?.classList.remove("active-navigation-item");
      userDoc?.classList.remove("active-navigation-item");
      mediaDoc?.classList.remove("active-navigation-item");
      logoutDoc.classList.add("active-navigation-item");
    }
  }, [dashboardComponent]);

  return (
    <div id="dashboard-container">
      <div
        id="dashboard-navigation-div"
        className={isNavOpen ? "active" : ""}
        onClick={closeNav}
      >
        <div id="company-details">DSMS</div>
        {/* <div className="partition-line"></div> */}
        <div id="dashboard-navigation-list-div">
          {currentUser.userType !== "USER" && (
            <div
              id="dashboard-dashboard-item"
              className="dashboard-navigation-item"
              onClick={() => {
                sessionStorage.setItem("homeComponent", "dashboard");
                setDashboardComponent("dashboard");
                setUserFilterApi(null);
                setMediaFilterApi(null);
              }}
            >
              <div className="dashboard-navigation-icons">
                <AiFillHome size={14} color={"white"}></AiFillHome>
              </div>
              <p>Dashboard</p>
            </div>
          )}
          {currentUser.userType !== "USER" && (
            <div
              id="dashboard-users-item"
              className="dashboard-navigation-item"
              onClick={() => {
                sessionStorage.setItem("homeComponent", "users");
                setDashboardComponent("users");
                setMediaFilterApi(null);
              }}
            >
              <div className="dashboard-navigation-icons">
                <FaUser size={14} color="white"></FaUser>
              </div>
              <p>Users</p>
            </div>
          )}
          <div
            id="dashboard-media-item"
            className="dashboard-navigation-item"
            onClick={() => {
              sessionStorage.setItem("homeComponent", "media");
              setDashboardComponent("media");
              setUserFilterApi(null);
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
              sessionStorage.setItem("homeComponent", "logout");
              setDashboardComponent("logout");
              setUserFilterApi(null);
              setMediaFilterApi(null);
            }}
          >
            <div className="dashboard-navigation-icons">
              <SlLogout size={14} color="white"></SlLogout>
            </div>
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div id="dashboard-content-div">
        <div id="dashboard-content-navbar">
          <div className="dashboard-navbar-left-side">
            <div
              className="dashboard-nav-searchbar"
              style={{
                display:
                  dashboardComponent == "users" || dashboardComponent == "media"
                    ? "none"
                    : "none",
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
            <div className="navbar-menu-icon" onClick={toggleNav}>
              <HiOutlineMenuAlt1 size={28} color="#36454f" />
            </div>
          </div>
          <div
            className="dashboard-navbar-right-side"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              className="dashboard-navbar-dropdown"
              style={{
                display:
                  (dashboardComponent == "users" ||
                    dashboardComponent == "media" ||
                    dashboardComponent == "dashboard") &&
                  currentUser.userType === "SUPER_ADMIN"
                    ? "block"
                    : "none",
              }}
            >
              <NavbarDropdown
                returnValue={(val) => {
                  sessionStorage.setItem("tenant", val);
                  dispatch(setTenant(val));
                }}
              ></NavbarDropdown>
            </div>
            {/* <div className="bell-icon">
              <VscBellDot size={24}></VscBellDot>
            </div> */}
            <div id="navbar-admin-details">
              <div id="navbar-admin-logo">
                <img
                  src={user_img}
                  alt=""
                  onClick={handleProfileModalVisible}
                />
              </div>
              {/* <div id="navbar-admin-text">
                <p id="admin-username">{username}</p>
                <p id="admin-fullname">John Doe</p>
              </div> */}
            </div>
          </div>
        </div>
        <div id="dashboard-content-details">
          {dashboardComponent == "dashboard" && (
            <DashboardComponent></DashboardComponent>
          )}

          {dashboardComponent == "users" && currentUser.userType !== "USER" && (
            <div className="dashboard-user">
              <div id="dashboard-content-today-details-div">
                <p id="users-text">Users</p>
                <div className="dashboard-user-buttons">
                  <div
                    onClick={() => handleUserFilterVisibility()}
                    id="dashboard-filter-button"
                  >
                    <IoFilter size={14} />

                    <p>Filters</p>
                  </div>
                  <div
                    onClick={() => handleCreateUserFunc()}
                    id="dashboard-create-user-button"
                  >
                    <p>Create User</p>
                  </div>
                </div>
              </div>

              <UserDataFilterModal
                show={userFilterModalVisible}
                close={() => setUserFilterModalVisible(false)}
                getUserFilterApi={(val) => setUserFilterApi(val)}
              ></UserDataFilterModal>

              <UserCreateModal
                show={createUserModalVisible}
                close={() => setCreateUserModalVisible(false)}
              ></UserCreateModal>

              <div id="dashboard-content-user-details-div">
                {data && <UserData userFilterApi={userFilterApi}></UserData>}
              </div>
            </div>
          )}

          {dashboardComponent == "media" && (
            <div className="dashboard-media">
              <div id="dashboard-content-today-details-div">
                <p id="users-text">Media</p>
                <div className="dashboard-user-buttons">
                  <div
                    onClick={() => handleMediaFilterVisibility()}
                    id="dashboard-filter-button"
                  >
                    <IoFilter size={14} />
                    <p>Filters</p>
                  </div>
                  <div
                    onClick={() => handleUploadMediaFunc()}
                    id="dashboard-create-media-button"
                  >
                    <p>Upload Media</p>
                  </div>
                </div>
              </div>

              <MediaDataFilterModal
                show={mediaFilterModalVisible}
                close={() => setMediaFilterModalVisible(false)}
                getMediaFilterApi={(val) => setMediaFilterApi(val)}
              ></MediaDataFilterModal>

              <UploadMediaModal
                show={uploadMediaModalVisible}
                close={() => setUploadMediaModalVisible(false)}
              ></UploadMediaModal>

              <div id="dashboard-content-user-details-div">
                {data_media && (
                  <MediaData mediaFilterApi={mediaFilterApi}></MediaData>
                )}
              </div>
            </div>
          )}

          {dashboardComponent == "logout" && (
            <LogoutForm
              close={() => setDashboardComponent("dashboard")}
            ></LogoutForm>
          )}
        </div>

        <Profile
          show={profileModalVisible}
          close={() => setProfileModalVisible(false)}
        ></Profile>
      </div>
    </div>
  );
};

export default Dashboard;
