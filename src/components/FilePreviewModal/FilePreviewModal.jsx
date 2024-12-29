import React from "react";
import "./FilePreviewModal.css";

const FilePreviewModal = ({ show, close, file }) => {
  const renderFile = () => {
    const extension = file.split(".").pop();

    switch (extension) {
      case "pdf":
        return (
          <iframe
            src={file}
            style={{ width: "100vh", height: "80vh", border: "none" }}
          />
        );
      case "jpg":
      case "png":
      case "jpeg":
      case "gif":
        return (
          <img
            src={file}
            alt="Preview"
            style={{ width: "50%", height: "50%", objectFit: "cover" }}
          />
        );
      case "mp4":
        return (
          <video controls style={{ maxWidth: "100%" }}>
            <source src={file} type="video/mp4" />
          </video>
        );
      case "mp3":
        return (
          <audio controls>
            <source src={file} type="audio/mp3" />
          </audio>
        );
      case "doc":
      case "docx":
      case "xls":
      case "xlsx":
        return (
          <iframe
            src={`https://docs.google.com/gview?url=${file}&embedded=true`}
            style={{ width: "100vh", height: "80vh", border: "none" }}
          />
        );
      default:
        return <p>Unsupported file type.</p>;
    }
  };

  const handleCloseModal = () => {
    close();
  };

  if (!show) return null;

  return (
    <div className="file-preview-modal-overlay" onClick={handleCloseModal}>
      <div
        className="file-preview-content"
        onClick={(e) => e.stopPropagation()}
        style={
          {
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   position : "relative"
          }
        }
      >
        {renderFile()}
      </div>
    </div>
  );
};

export default FilePreviewModal;

// Usage
{
  // <FileViewer file={doc}></FileViewer>
}
