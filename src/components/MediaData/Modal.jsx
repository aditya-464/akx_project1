// Modal.js
import React from "react";
import "./Modal.css"; // Add your modal styles here

const Modal = ({ show, close, media }) => {
  if (!show) return null;

  const renderMediaContent = () => {
    if (media.type === "image") {
      return (
        <img src={media.filePreview} alt={media.name} className="modal-media" />
      );
    } else if (media.type === "pdf") {
      return (
        <iframe
          src={media.filePreview}
          width="100%"
          height="500px"
          title={media.name}
        ></iframe>
      );
    } else if (media.type === "doc" || media.type === "docx") {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${media.filePreview}&embedded=true`}
          width="100%"
          height="500px"
          title={media.name}
        ></iframe>
      );
    } else if (media.type === "excel" || media.type === "xlsx") {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${media.filePreview}&embedded=true`}
          width="100%"
          height="500px"
          title={media.name}
        ></iframe>
      );
    } else if (media.type === "txt") {
      return (
        <iframe
          src={media.filePreview}
          width="100%"
          height="500px"
          title={media.name}
        ></iframe>
      );
    } else {
      return (
        <div>
          <p>Preview not available for this file type.</p>
          <a href={media.filePreview} download>
            Download {media.type.toUpperCase()} File
          </a>
        </div>
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={close}>
            x
          </button>
        </div>
        <div className="modal-body">{renderMediaContent()}</div>
      </div>
    </div>
  );
};

export default Modal;
