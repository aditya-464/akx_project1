import React from "react";
import Select from "react-dropdown-select";
import "./LoginFormDropdown.css";
import { IoIosArrowDown } from "react-icons/io";

const LoginFormDropdown = (props) => {
  const { options, returnValue } = props;

  const handleSetOption = (values) => {
    if (values.length > 0) {
      returnValue(values[0].name);
    }
  };

  return (
    <Select
      className="login-form-dropdown"
      options={options}
      disabled={options !== null ? false : true}
      placeholder="Search"
      labelField="name"
      valueField="name"
      dropdownHandleRenderer={() => (
        // <span style={{ width: "20px", height: "20px" }}>▼</span>
        <div className="dropdown-icon-div">
          <IoIosArrowDown color="#36454f" />
        </div>
      )}
      onChange={(values) => handleSetOption(values)}
    />
  );
};

export default LoginFormDropdown;
