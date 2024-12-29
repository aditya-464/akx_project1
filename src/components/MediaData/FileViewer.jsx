import React from "react";

const FileViewer = ({ file }) => {
  const renderFile = () => {
    const extension = file.split(".").pop();

    switch (extension) {
      case "pdf":
        return <iframe src={file} style={{ width: "100%", height: "80vh" }} />;
      case "jpg":
      case "png":
      case "jpeg":
      case "gif":
        return <img src={file} alt="Preview" style={{ maxWidth: "100%" }} />;
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
            style={{ width: "100%", height: "80vh" }}
          />
        );
      default:
        return <p>Unsupported file type.</p>;
    }
  };

  return <div>{renderFile()}</div>;
};

export default FileViewer;

// Usage
{
  // <FileViewer file={doc}></FileViewer>
}
