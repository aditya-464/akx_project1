import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import "./NavbarDropdown.css";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

// const options = [
//   {
//     id: 1,
//     name: "Leanne Graham",
//   },
//   {
//     id: 2,
//     name: "Erin Howell",
//   },
//   {
//     id: 3,
//     name: "Leanne Graham",
//   },
//   {
//     id: 4,
//     name: "Ervi Howell",
//   },
//   {
//     id: 5,
//     name: "Leanne Graham",
//   },
//   {
//     id: 6,
//     name: "Ervin Howll",
//   },
// ];

const NavbarDropdown = ({ returnValue }) => {
  const { tenantOptions, tenant } = useSelector((state) => state.page);

  const [option, setOption] = useState("");

  const handleSetOption = (values) => {
    returnValue(values[0]);
  };

  useEffect(() => {
    // Set a specific option as the initial one
    if (tenantOptions && tenantOptions.length > 0) {
      const defaultOption = tenantOptions.find((opt) => opt.name === tenant);
      if (defaultOption) {
        setOption([defaultOption]); // Wrap in an array since react-dropdown-select expects an array
      }
    }
  }, [tenantOptions]);

  return (
    tenantOptions && (
      <Select
        values={option}
        className="navbar-dropdown"
        options={tenantOptions}
        labelField="name"
        valueField="name"
        placeholder="Select brand..."
        dropdownHandleRenderer={() => (
          // <span style={{ width: "20px", height: "20px" }}>▼</span>
          <div className="dropdown-icon-div">
            <IoIosArrowDown color="#36454f" />
          </div>
        )}
        onChange={(values) => handleSetOption(values)}
      />
    )
  );
};

export default NavbarDropdown;
