import React, { useState, useEffect } from "react";
import "./MediaDataFilterModal.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refreshMedia } from "../../redux/page";
import { toast } from "react-toastify";

const options = [
  "Most Recent",
  "Least Recent",
  "Approved",
  "Not Approved",
  "Image",
  "Document",
  "Audio",
  "Video",
];

const MediaDataFilterModal = ({ show, close, getMediaFilterApi }) => {
  const { currentUser, tenant } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [uploadedByName, setUploadedByName] = useState("");
  const [approvedByName, setApprovedByName] = useState("");

  const initialSelectedOptions = options.reduce((acc, option) => {
    acc[option] = false;
    return acc;
  }, {});

  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );

  const handleChangeCheckBox = (event) => {
    const { value, checked } = event.target;

    // If "Most Recent" is selected, automatically uncheck "Least Recent", and vice versa
    if (value === "Most Recent" && checked) {
      setSelectedOptions({
        "Most Recent": true,
        "Least Recent": false,
        Approved: selectedOptions["Approved"],
        "Not Approved": selectedOptions["Not Approved"],
        Image: selectedOptions["Image"],
        Document: selectedOptions["Document"],
        Audio: selectedOptions["Audio"],
        Video: selectedOptions["Video"],
      });
    } else if (value === "Least Recent" && checked) {
      setSelectedOptions({
        "Most Recent": false,
        "Least Recent": true,
        Approved: selectedOptions["Approved"],
        "Not Approved": selectedOptions["Not Approved"],
        Image: selectedOptions["Image"],
        Document: selectedOptions["Document"],
        Audio: selectedOptions["Audio"],
        Video: selectedOptions["Video"],
      });
    } else {
      // For other options, simply update the state
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [value]: checked,
      }));
    }
  };

  const handleApplyFilter = () => {
    const filterAPI = {};
    if (searchId !== "") {
      filterAPI["id"] = searchId;
    }
    if (searchName !== "") {
      filterAPI["fileName"] = searchName;
    }
    if (uploadedByName !== "") {
      filterAPI["uploadedByName"] = uploadedByName;
    }
    // if (approvedByName !== "") {
    //   filterAPI["approvedByName"] = approvedByName;
    // }
    if (selectedOptions["Least Recent"] === true) {
      filterAPI["sortBy"] = "uploadDate";
      filterAPI["order"] = "asc";
    }
    if (selectedOptions["Most Recent"] === true) {
      filterAPI["sortBy"] = "uploadDate";
      filterAPI["order"] = "desc";
    }
    if (selectedOptions["Approved"] === true) {
      filterAPI["approvedStatus"] = "true";
    }
    if (selectedOptions["Not Approved"] === true) {
      filterAPI["approvedStatus"] = "false";
    }
    if (selectedOptions["Image"] === true) {
      if (filterAPI.hasOwnProperty("mediaTypes")) {
        filterAPI["mediaTypes"] += "IMAGE,";
      } else {
        filterAPI["mediaTypes"] = "IMAGE,";
      }
    }
    if (selectedOptions["Document"] === true) {
      if (filterAPI.hasOwnProperty("mediaTypes")) {
        filterAPI["mediaTypes"] += "DOCUMENT,FILE,";
      } else {
        filterAPI["mediaTypes"] = "DOCUMENT,FILE,";
      }
    }
    if (selectedOptions["Audio"] === true) {
      if (filterAPI.hasOwnProperty("mediaTypes")) {
        filterAPI["mediaTypes"] += "AUDIO,";
      } else {
        filterAPI["mediaTypes"] = "AUDIO,";
      }
    }
    if (selectedOptions["Video"] === true) {
      if (filterAPI.hasOwnProperty("mediaTypes")) {
        filterAPI["mediaTypes"] += "VIDEO,";
      } else {
        filterAPI["mediaTypes"] = "VIDEO,";
      }
    }

    if (filterAPI.hasOwnProperty("mediaTypes")) {
      filterAPI["mediaTypes"] = filterAPI["mediaTypes"].slice(0, -1);
    }

    let result = "";
    result = Object.entries(filterAPI)
      .map(([key, value]) => `${key}=${value}`) // Format each key-value pair as "key=value"
      .join("&");

    if (result === "") {
      getMediaFilterApi(null);
    } else {
      const mediaFilterUrl = "/media/all?" + result;
      getMediaFilterApi(mediaFilterUrl);
    }
    handleClose();
  };

  const handleClearAll = () => {
    getMediaFilterApi(null);
    close();
    setSearchId("");
    setSearchName("");
    setUploadedByName("");
    setApprovedByName("");
    setSelectedOptions(initialSelectedOptions);
  };

  const handleClose = () => {
    close();
  };

  if (!show) return <></>;

  return (
    <>
      <div className="media-filter-container">
        <div className="media-filter-popup">
          <p id="filter-media-details-text">Select Filter Details</p>
          <div className="media-filter-fields-group">
            <div
              className="media-filter-field"
              style={{ paddingRight: "2rem" }}
            >
              <p className="media-filter-field-heading">ID</p>
              <input
                type="text"
                name="id"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                }}
                className="media-filter-input-field"
              />
            </div>
            <div className="media-filter-field">
              <p className="media-filter-field-heading">Name</p>
              <input
                type="text"
                name="name"
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
                // placeholder="Enter Name"
                className="media-filter-input-field"
              />
            </div>
          </div>
          <div className="media-filter-fields-group">
            <div
              className="media-filter-field"
              style={{ paddingRight: "2rem" }}
            >
              <p className="media-filter-field-heading">Uploaded By</p>
              <input
                type="text"
                name="uploaded-by"
                value={uploadedByName}
                onChange={(e) => {
                  setUploadedByName(e.target.value);
                }}
                className="media-filter-input-field"
              />
            </div>
            <div className="media-filter-field">
              <p className="media-filter-field-heading">Approved By</p>
              <input
                type="text"
                name="approved-by"
                value={approvedByName}
                onChange={(e) => {
                  setApprovedByName(e.target.value);
                }}
                // placeholder="Enter Name"
                className="media-filter-input-field"
              />
            </div>
          </div>

          <div className="media-filter-checkbox-group">
            {options.map((option, index) => (
              <div className="media-filter-checkbox" key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions[option]}
                    onChange={handleChangeCheckBox}
                  />
                  <span className="media-filter-checkbox-name">{option}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="media-filter-buttons-div">
            <div
              className="media-filter-clear-btn"
              style={{ marginRight: "2rem" }}
              onClick={() => handleClearAll()}
            >
              <p>Clear All</p>
            </div>
            <button
              type="submit"
              className="media-filter-apply-btn"
              onClick={() => handleApplyFilter()}
            >
              <p>Apply Filter(s)</p>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="overlay" onClick={handleClose}></div>
    </>
  );
};

export default MediaDataFilterModal;
