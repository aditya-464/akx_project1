import React from "react";
import "./DeleteMediaModal.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { refreshMedia } from "../../redux/page";
import { toast } from "react-toastify";

const DeleteMediaModal = ({ show, close, mediaDetails }) => {
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

  const handleDelete = async () => {
    try {
      const id = mediaDetails.id;
      const headers = {
        "X-TenantID": tenant,
      };

      const response = await axios.delete(`/media/${id}`, { headers });
      if (response.status === 200) {
        showSuccessToast(response.data.message);
        dispatch(refreshMedia());
      }
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
      console.log(error.message);
      showErrorToast(error.message);
    }
  };

  const handleCloseModal = () => {
    close();
  };

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
              <span className="delete-media-name">
                {mediaDetails.fileName}?
              </span>
            </p>
            <div className="delete-media-buttons-container">
              <div className="delete-media-no-button" onClick={close}>
                <p>No</p>
              </div>
              <div className="delete-media-yes-button" onClick={handleDelete}>
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
