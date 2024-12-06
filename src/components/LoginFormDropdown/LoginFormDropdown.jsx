import React, { useState } from "react";
import Select from "react-dropdown-select";
import "./LoginFormDropdown.css";
import { IoIosArrowDown } from "react-icons/io";

const LoginFormDropdown = () => {
  const options = [
    {
      id: 1,
      name: "Leanne Graham",
    },
    {
      id: 2,
      name: "Erin Howell",
    },
    {
      id: 3,
      name: "Leanne Graham",
    },
    {
      id: 4,
      name: "Ervi Howell",
    },
    {
      id: 5,
      name: "Leanne Graham",
    },
    {
      id: 6,
      name: "Ervin Howll",
    },
  ];

  const [option, setOption] = useState("");
  const handleSetOption = (values) => {
    console.log(values[0]);
  };

  return (
    <Select
      className="login-form-dropdown"
      options={options}
      labelField="name"
      valueField="name"
      dropdownHandleRenderer={() => (
        // <span style={{ width: "20px", height: "20px" }}>▼</span>
        <div className="dropdown-icon-div">
          <IoIosArrowDown color="#36454f"/>
        </div>
      )}
      onChange={(values) => handleSetOption(values)}
    />
  );
};

export default LoginFormDropdown;
