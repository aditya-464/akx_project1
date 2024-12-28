import React from "react";
import "./RejectMediaModal.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const RejectMediaModal = ({ show, close, mediaDetails }) => {
  const dispatch = useDispatch();

  const handleReject = async () => {
    try {
      const id = mediaDetails.id;
      const headers = {
        "X-TenantID": "vmodaqa",
      };
      const approvedBy = 19;
      const status = false;

      const response = await axios.put(
        `/media/${id}/approve?approvedBy=${approvedBy}&status=${status}`,
        {}, // Body (empty)
        {
          headers,
        }
      );

      handleCloseModal();
    } catch (error) {
      console.log(error.message);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    close();
  };

  if (!show) return null;
  return (
    <div className="reject-media-modal-overlay" onClick={close}>
      <div
        className="reject-media-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="reject-media-modal-header">
          {/* <button className="close-btn" onClick={close}>
              x
            </button> */}
        </div>
        <div className="reject-media-modal-body">
          <div className="reject-media-form">
            <p className="reject-media-ask-text">
              Do you wan't to reject
              <span className="reject-media-name">
                {mediaDetails.fileName}?
              </span>
            </p>
            <div className="reject-media-buttons-container">
              <div className="reject-media-no-button" onClick={close}>
                <p>No</p>
              </div>
              <div className="reject-media-yes-button" onClick={handleReject}>
                <p>Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectMediaModal;
