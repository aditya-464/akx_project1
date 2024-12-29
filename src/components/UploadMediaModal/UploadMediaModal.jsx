import React, { useEffect, useState } from "react";
import "./UploadMediaModal.css";
import { useSelector, useDispatch } from "react-redux";
import { insertMedia, refreshMedia } from "../../redux/page";
import LoginFormDropdown from "../LoginFormDropdown/LoginFormDropdown";
import axios from "axios";
import { toast } from "react-toastify";

const UploadMediaModal = ({ show, close }) => {
  // first get overall data to decide the id of new entry

  const options = [
    {
      id: 1,
      name: "Image",
    },
    {
      id: 2,
      name: "Audio",
    },
    {
      id: 3,
      name: "Video",
    },
    {
      id: 4,
      name: "PDF",
    },
    {
      id: 5,
      name: "Doc",
    },
    {
      id: 6,
      name: "Excel",
    },
  ];
  const [formMediaData, setFormMediaData] = useState({
    fileType: "",
    file: null,
  });
  const [fileMediaPreview, setFileMediaPreview] = useState(null);
  const { currentUser, tenant } = useSelector((state) => state.page);

  const dispatch = useDispatch();

  const handleMediaDropdownChange = (val) => {
    setFormMediaData((prev) => ({ ...prev, fileType: val.toLowerCase() }));
  };

  const handleMediaFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormMediaData((prev) => ({ ...prev, file }));
      if (formMediaData.fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => setFileMediaPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setFileMediaPreview(null); // No preview for non-image files
      }
    }
  };

  const getAcceptedMediaFileTypes = (type) => {
    switch (type) {
      case "image":
        return "image/*";
      case "pdf":
        return ".pdf";
      case "doc":
        return ".doc,.docx";
      case "excel":
        return ".xls,.xlsx";
      case "txt":
        return ".txt";
      default:
        return "";
    }
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

  const handleMediaSubmit = async () => {
    try {
      if (formMediaData.file) {
        // let pdfFileView = "";
        // if (formMediaData.fileType == "pdf") {
        //   pdfFileView = URL.createObjectURL(formMediaData.file);
        // }
        // const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2); // Size in MB, rounded to 2 decimal places

        const fileSizeInBytes = formMediaData.file.size;

        const newMedia = new FormData();
        let fileType = formMediaData.fileType.toUpperCase();
        if (fileType === "PDF" || fileType === "DOC") {
          fileType = "DOCUMENT";
        }
        if (
          fileType === "EXCEL" ||
          fileType === "TXT" ||
          fileType === "PPT" ||
          fileType === "PPTX"
        ) {
          fileType = "FILE";
        }

        newMedia.append("uploadedBy", currentUser.id);
        newMedia.append("mediaType", fileType);
        newMedia.append("byteSize", fileSizeInBytes);
        newMedia.append("file", formMediaData.file);

        const headers = {
          "X-TenantID": tenant,
        };

        const response = await axios.post("/media/upload", newMedia, {
          headers,
        });
        console.log(response);
        if (response.status === 201) {
          showSuccessToast(response.data.message);
          dispatch(refreshMedia());
        }

        // Create a new media object to store file details
        // const newMedia = {
        //   name: formMediaData.file.name,
        //   type: formMediaData.fileType,
        //   size: fileSizeInMB + " MB",
        //   filePreview:
        //     formMediaData.fileType == "pdf" ? pdfFileView : fileMediaPreview,
        //   uploadedBy: "Admin",
        //   uploadedAt: new Date().toISOString(),
        // };

        // Update the data_media state with the new media item
        // setData_media((prevData) => [...prevData, newMedia]);
        // console.log(newMedia);
        // dispatch(insertMedia(newMedia));
        handleCloseModal();
      } else {
        showErrorToast("Please select a file!");
      }
    } catch (error) {
      console.log(error.message);
      showErrorToast(error.message);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    close();
    setFormMediaData({
      fileType: "",
      file: null,
    });
    setFileMediaPreview(null);
  };

  if (!show) return <></>;

  return (
    <>
      <div className="popup-container-media">
        <div className="popup-media">
          <p id="upload-media-text">Upload Media</p>
          {/* onSubmit={handleMediaSubmit} */}
          <div className="popup-form-media">
            {/* <div>
              <select
                name="fileType"
                value={formMediaData.fileType}
                onChange={handleMediaDropdownChange}
                className="input-field-media"
              >
                <option className="media-modal-option" value="">
                  Select
                </option>
                <option className="media-modal-option" value="image">
                  Image
                </option>
                <option className="media-modal-option" value="pdf">
                  PDF
                </option>
                <option className="media-modal-option" value="doc">
                  Word Document
                </option>
                <option className="media-modal-option" value="excel">
                  Excel
                </option>
                <option className="media-modal-option" value="txt">
                  Text File
                </option>
              </select>
            </div> */}
            <div>
              <p className="media-modal-field-heading">Select File Format</p>
              <LoginFormDropdown
                options={options}
                returnValue={(val) => handleMediaDropdownChange(val)}
              ></LoginFormDropdown>
            </div>
            <div
              style={{
                marginTop: "2rem",
              }}
            >
              <div className="media-modal-field-heading">
                <p>Choose File</p>
              </div>
              <input
                style={{
                  border: "none",
                  outline: "none",
                  padding: "0",
                  margin: "1rem 0rem",
                }}
                type="file"
                accept={getAcceptedMediaFileTypes(formMediaData.fileType)}
                onChange={handleMediaFileChange}
                className="input-field-media"
              />
              {fileMediaPreview && (
                <div className="media-preview-container">
                  {formMediaData.fileType === "image" && (
                    <img
                      src={fileMediaPreview}
                      alt="Media Preview"
                      className="media-img-preview"
                    />
                  )}
                  {formMediaData.fileType !== "image" && (
                    <p className="media-doc-preview">
                      Selected File:{" "}
                      {formMediaData.file?.name || "No file selected"}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="media-create-buttons-div">
              <div
                className="media-create-cancel-btn"
                onClick={handleCloseModal}
              >
                <p>Cancel</p>
              </div>
              <div
                className="media-create-submit-btn"
                onClick={handleMediaSubmit}
              >
                <p>Upload</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className="overlay-media"
        onClick={handleCloseModal} // Clicking outside closes the popup
      ></div>
    </>
  );
};

export default UploadMediaModal;
