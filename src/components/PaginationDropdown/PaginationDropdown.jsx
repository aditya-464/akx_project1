import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import "./PaginationDropdown.css";
import { IoIosArrowDown } from "react-icons/io";

const PaginationDropdown = (props) => {
  const { options, returnValue, defaultValue, resetTrigger } = props;
  const [option, setOption] = useState([]);

  const handleSetOption = (values) => {
    if (values.length > 0) {
      setOption(values); // Update the option state with the selected value
      returnValue(values[0].name);
    }
  };

  const handleDefaultOption = () => {
    if (options && options.length > 0) {
      const defaultOption = options.find((opt) => opt.name === defaultValue);
      if (defaultOption) {
        setOption([defaultOption]);
        returnValue(defaultOption.name);
      }
    }
  };

  useEffect(() => {
    if (defaultValue !== null) {
      handleDefaultOption();
    }
  }, [options, defaultValue, resetTrigger]);

  return (
    <Select
      values={option}
      className="pagination-dropdown"
      options={options}
      disabled={options !== null ? false : true}
      searchable={false}
      //   placeholder="Search"
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

export default PaginationDropdown;
