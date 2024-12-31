import React, { useState, useEffect } from "react";
import "./UserDataFilterModal.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/page";
import { toast } from "react-toastify";

const options = [
  "Most Recent",
  "Least Recent",
  "Organizational Admins",
  "Users",
];

const UserDataFilterModal = ({ show, close }) => {
  const { currentUser, tenant } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);

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
        "Organizational Admins": selectedOptions["Organizational Admins"],
        Users: selectedOptions["Users"],
      });
    } else if (value === "Least Recent" && checked) {
      setSelectedOptions({
        "Most Recent": false,
        "Least Recent": true,
        "Organizational Admins": selectedOptions["Organizational Admins"],
        Users: selectedOptions["Users"],
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
    console.log(selectedOptions);
    setIsFilterApplied(true);
    handleClose();
  };

  const handleClearAll = () => {
    close();
    setIsFilterApplied(false);
    setSearchId("");
    setSearchName("");
    setSelectedOptions(initialSelectedOptions);
  };

  const handleClose = () => {
    close();
  };

  if (!show) return <></>;

  return (
    <>
      <div className="user-filter-container">
        <div className="user-filter-popup">
          <p id="filter-user-details-text">Select Filter Details</p>
          <div className="user-filter-fields-group">
            <div className="user-filter-field" style={{ paddingRight: "2rem" }}>
              <p className="user-filter-field-heading">ID</p>
              <input
                type="text"
                name="id"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                }}
                className="user-filter-input-field"
              />
            </div>
            <div className="user-filter-field">
              <p className="user-filter-field-heading">Name</p>
              <input
                type="text"
                name="name"
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
                // placeholder="Enter Name"
                className="user-filter-input-field"
              />
            </div>
          </div>

          <div className="user-filter-checkbox-group">
            {options.map((option, index) => (
              <div className="user-filter-checkbox" key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions[option]}
                    onChange={handleChangeCheckBox}
                  />
                  <span className="user-filter-checkbox-name">{option}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="user-filter-buttons-div">
            <div
              className="user-filter-clear-btn"
              style={{ marginRight: "2rem" }}
              onClick={() => handleClearAll()}
            >
              <p>Clear All</p>
            </div>
            <button
              type="submit"
              className="user-filter-apply-btn"
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

export default UserDataFilterModal;
