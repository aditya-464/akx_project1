import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import "./MediaData.css";
import Modal from "./Modal.jsx"; // Import the modal component
import ApproveMediaModal from "../ApproveMediaModal/ApproveMediaModal.jsx";
import DeleteMediaModal from "../DeleteMediaModal/DeleteMediaModal.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import RejectMediaModal from "../RejectMediaModal/RejectMediaModal.jsx";
import FilePreviewModal from "../FilePreviewModal/FilePreviewModal.jsx";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const MediaData = () => {
  const { currentUser, tenant, refreshMediaCount } = useSelector(
    (state) => state.page
  );

  const [actualData, setActualData] = useState(null);
  const [visibleMediaMenuId, setVisibleMediaMenuId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [approveMediaModalVisible, setApproveMediaModalVisible] =
    useState(false);
  const [rejectMediaModalVisible, setRejectMediaModalVisible] = useState(false);
  const [deleteMediaModalVisible, setdeleteMediaModalVisible] = useState(false);
  const [filePreviewModalVisible, setFilePreviewModalVisible] = useState(false);
  const [deleteMediaDetails, setDeleteMediaDetails] = useState("");
  const [approveMediaDetails, setApproveMediaDetails] = useState("");
  const [rejectMediaDetails, setRejectMediaDetails] = useState("");
  const [doc, setDoc] = useState(null);

  const [selectedMedia, setSelectedMedia] = useState(null);
  const dispatch = useDispatch();

  // Toggle the visibility of the media menu
  const toggleMediaMenu = (id, e) => {
    e.stopPropagation(); // Stop event propagation to prevent menu from closing when clicking the options
    setVisibleMediaMenuId(visibleMediaMenuId === id ? null : id); // If menu is open, close it; otherwise, open it.
  };

  // Close the media menu when clicked outside
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".popup-menu-media") &&
      !e.target.closest(".media-item")
    ) {
      setVisibleMediaMenuId(null); // Close the menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Handle the "View" action for media
  const handleView = (media) => {
    setSelectedMedia(media); // Set the selected media to be viewed
    setModalVisible(true); // Show the modal
    setVisibleMediaMenuId(null); // Close the menu after viewing
  };

  // Handle the "Delete" action for media
  const handleDelete = (item) => {
    // console.log("Deleting media item:", mediaId);
    // Add logic for deleting media item
    setDeleteMediaDetails(item);
    setdeleteMediaModalVisible(true);
    setVisibleMediaMenuId(null); // Close the menu after deleting
  };

  const handleApprove = (item) => {
    // console.log("Approving media item:", mediaId);
    // Add logic for deleting media item
    setApproveMediaDetails(item);
    setApproveMediaModalVisible(true);
    setVisibleMediaMenuId(null); // Close the menu after deleting
  };

  const handleReject = (item) => {
    // console.log("Rejecting media item:", mediaId);
    // Add logic for deleting media item
    // setApproveMediaModalVisible(true);
    setRejectMediaDetails(item);
    setRejectMediaModalVisible(true);
    setVisibleMediaMenuId(null);
  };

  const getMediaLink = (val) => {
    const link = "http://84.247.171.46" + val;
    return link;
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

  const handleFilePreview = (item) => {
    const link = getMediaLink(item.filePath);
    setDoc(link);
    if (navigator.onLine) {
      setFilePreviewModalVisible(true);
    } else {
      showErrorToast("You are offline!");
    }
  };

  const getActualData = async () => {
    try {
      const headers = {
        "X-TenantID": tenant,
      };
      const response = await axios.get("/media/all", { headers });
      if (response.status === 200) {
        setActualData(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    getActualData();
  }, [refreshMediaCount]);

  if (!actualData) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        <ColorRing
          visible={!actualData ? true : false}
          height="70"
          width="70"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={[
            "#03c988",
            "#03c988",
            "#03c988",
            "#03c988",
            "#03c988",
            "#03c988",
          ]}
        />
      </div>
    );
  }

  return (
    actualData && (
      <div id="media-data-container">
        {
          <>
            <div id="media-data-headings-div">
              <div id="media-heading-checkbox"></div>
              <p className="media-heading-id">Id</p>
              <p className="media-heading-image">Preview</p>
              <p className="media-heading-name">Name</p>
              {/* <p className="media-heading-size">Size</p> */}
              <p className="media-heading-size">Status</p>
              <p className="media-heading-uploaded-by">Uploaded By</p>
              <p className="media-heading-uploaded-at">Uploaded At</p>
              <div
                className="media-data-option-div"
                style={{ visibility: "hidden" }}
              >
                <SlOptionsVertical size={12} />
              </div>
            </div>

            <div id="media-data-partition-horizontal"></div>
            <div id="media-data-content-div">
              {actualData.map((item) => (
                <div key={item.id} className="media-data-item-div">
                  <p className="media-heading-id media-data-item">{item.id}</p>
                  <div
                    className="media-heading-image media-data-item"
                    onClick={() => {
                      handleFilePreview(item);
                    }}
                  >
                    <img
                      className="media-data-image"
                      // src={item.filePath || "https://via.placeholder.com/40"}
                      // alt={item.fileName}
                      src={
                        item.mediaType === "IMAGE"
                          ? getMediaLink(item.filePath)
                          : "https://i.pinimg.com/564x/3c/00/86/3c00869f0e6f1cebb3125bf13512edc8.jpg"
                      }
                    />
                  </div>
                  <p className="media-heading-name media-data-item">
                    {item.fileName}
                  </p>
                  <p className="media-heading-size media-data-item">
                    {/* {(item.byteSize / (1024 * 1024)).toFixed(1)} MB */}
                    {item.approvedStatus === true ? "Approved" : "Not Approved"}
                  </p>
                  <p className="media-heading-uploaded-by media-data-item">
                    {item.uploadedBy.name}
                  </p>
                  <p className="media-heading-uploaded-at media-data-item">
                    {item.uploadDate}
                  </p>
                  <div
                    className="media-data-option-div"
                    onClick={(e) => toggleMediaMenu(item.id, e)} // Pass event to stop propagation
                  >
                    <SlOptionsVertical size={12} />
                  </div>

                  {/* Popup Menu */}
                  {visibleMediaMenuId === item.id && (
                    <div className="popup-menu-media">
                      {/* <p
                        className="popup-menu-item-media"
                        onClick={() => handleView(item)} // Pass entire media object
                      >
                        View
                      </p> */}
                      <p
                        className="popup-menu-item-media"
                        onClick={() => handleApprove(item)}
                      >
                        Approve
                      </p>
                      <p
                        className="popup-menu-item-media"
                        onClick={() => handleReject(item)}
                      >
                        Reject
                      </p>
                      <p
                        className="popup-menu-item-media"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        }

        {/* Modal to display the selected media */}
        {/* <Modal
          show={modalVisible}
          close={() => setModalVisible(false)}
          media={selectedMedia}
        /> */}

        <DeleteMediaModal
          show={deleteMediaModalVisible}
          close={() => setdeleteMediaModalVisible(false)}
          mediaDetails={deleteMediaDetails}
        ></DeleteMediaModal>

        <ApproveMediaModal
          show={approveMediaModalVisible}
          close={() => setApproveMediaModalVisible(false)}
          mediaDetails={approveMediaDetails}
        ></ApproveMediaModal>

        <RejectMediaModal
          show={rejectMediaModalVisible}
          close={() => setRejectMediaModalVisible(false)}
          mediaDetails={rejectMediaDetails}
        ></RejectMediaModal>

        <FilePreviewModal
          show={filePreviewModalVisible}
          close={() => setFilePreviewModalVisible(false)}
          file={doc}
        ></FilePreviewModal>
      </div>
    )
  );
};

export default MediaData;
