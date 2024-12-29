import React from "react";
import "./ApproveMediaModal.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { refreshMedia } from "../../redux/page";

const ApproveMediaModal = ({ show, close, mediaDetails }) => {
  const { currentUser, tenant } = useSelector((state) => state.page);
  const dispatch = useDispatch();

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

  const handleApprove = async () => {
    try {
      const id = mediaDetails.id;
      const headers = {
        "X-TenantID": tenant,
      };
      const approvedBy = currentUser.id;
      const status = true;

      const response = await axios.put(
        `/media/${id}/approve?approvedBy=${approvedBy}&status=${status}`,
        {}, // Body (empty)
        {
          headers,
        }
      );

      if (response.status === 200) {
        dispatch(refreshMedia());
        showSuccessToast(response.data.message);
      }

      handleCloseModal();
    } catch (error) {
      console.log(error.message);
      showErrorToast(error.message);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    close();
  };

  const getTruncatedName = (text) => {
    const truncatedText = text.length > 15 ? text.slice(0, 15) + "..." : text;
    return truncatedText;
  };

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
              Do you wan't to approve
              <span className="approve-media-name">
                {getTruncatedName(mediaDetails.fileName)}?
              </span>
            </p>
            <div className="approve-media-buttons-container">
              <div className="approve-media-no-button" onClick={close}>
                <p>No</p>
              </div>
              <div className="approve-media-yes-button" onClick={handleApprove}>
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
