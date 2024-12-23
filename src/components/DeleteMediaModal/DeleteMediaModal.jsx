import React from "react";
import "./DeleteMediaModal.css";

const DeleteMediaModal = ({ show, close, mediaDetails }) => {
  if (!show) return null;

  return (
    <div className="delete-media-modal-overlay" onClick={close}>
      <div
        className="delete-media-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-media-modal-header">
          {/* <button className="close-btn" onClick={close}>
              x
            </button> */}
        </div>
        <div className="delete-media-modal-body">
          <div className="delete-media-form">
            <p className="delete-media-ask-text">
              Do you wan't to delete
              <p className="delete-media-name">{mediaDetails.name}?</p>
            </p>
            <div className="delete-media-buttons-container">
              <div className="delete-media-no-button" onClick={close}>
                <p>No</p>
              </div>
              <div className="delete-media-yes-button">
                <p>Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMediaModal;
