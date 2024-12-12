import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import "./MediaData.css";
import Modal from "./Modal.jsx"; // Import the modal component
import ApproveMediaModal from "../ApproveMediaModal/ApproveMediaModal.jsx";

const MediaData = (props) => {
  const { dummy_data_media } = props;

  const [visibleMediaMenuId, setVisibleMediaMenuId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [approveMediaModalVisible, setApproveMediaModalVisible] =
    useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

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
  const handleDelete = (mediaId) => {
    console.log("Deleting media item:", mediaId);
    // Add logic for deleting media item
    setVisibleMediaMenuId(null); // Close the menu after deleting
  };

  const handleApprove = (mediaId) => {
    console.log("Deleting media item:", mediaId);
    // Add logic for deleting media item
    setApproveMediaModalVisible(true);
    setVisibleMediaMenuId(null); // Close the menu after deleting
  };

  return (
    <div id="media-data-container">
      {dummy_data_media && (
        <>
          <div id="media-data-headings-div">
            <div id="media-heading-checkbox"></div>
            <p className="media-heading-id">Id</p>
            <p className="media-heading-image">Preview</p>
            <p className="media-heading-name">Name</p>
            <p className="media-heading-size">Size</p>
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
            {dummy_data_media.map((item) => (
              <div key={item.id} className="media-data-item-div">
                <p className="media-heading-id media-data-item">{item.id}</p>
                <div className="media-heading-image media-data-item">
                  <img
                    className="media-data-image"
                    src={item.filePreview || "https://via.placeholder.com/40"} // Default placeholder if no image
                    alt={item.name}
                  />
                </div>
                <p className="media-heading-name media-data-item">
                  {item.name}
                </p>
                <p className="media-heading-size media-data-item">
                  {item.size}
                </p>
                <p className="media-heading-uploaded-by media-data-item">
                  {item.uploadedBy}
                </p>
                <p className="media-heading-uploaded-at media-data-item">
                  {item.uploadedAt}
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
                    <p
                      className="popup-menu-item-media"
                      onClick={() => handleView(item)} // Pass entire media object
                    >
                      View
                    </p>
                    <p
                      className="popup-menu-item-media"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </p>
                    <p
                      className="popup-menu-item-media"
                      onClick={() => handleApprove(item.id)}
                    >
                      Approve
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal to display the selected media */}
      <Modal
        show={modalVisible}
        close={() => setModalVisible(false)}
        media={selectedMedia}
      />

      <ApproveMediaModal
        show={approveMediaModalVisible}
        close={() => setApproveMediaModalVisible(false)}
      ></ApproveMediaModal>
    </div>
  );
};

export default MediaData;
