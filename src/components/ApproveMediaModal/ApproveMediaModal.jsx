import React from "react";
import "./ApproveMediaModal.css";

const ApproveMediaModal = ({ show, close }) => {
  if (!show) return null;
  return (
    <div className="approve-media-modal-overlay" onClick={close}>
      <div
        className="approve-media-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="approve-media-modal-header">
          {/* <button className="close-btn" onClick={close}>
            x
          </button> */}
        </div>
        <div className="approve-media-modal-body">
          <div className="approve-media-form">
            <p className="approve-media-ask-text">
              Do you wan't to approve this media?
            </p>
            <div className="approve-media-buttons-container">
              <div className="approve-media-no-button" onClick={close}>
                <p>No</p>
              </div>
              <div className="approve-media-yes-button">
                <p>Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveMediaModal;
