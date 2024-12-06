// Dropdown.js
import React, { useState } from "react";
import "./LoginPageDropdown.css";

const LoginPageDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="login-page-dropdown">
      <button
        className="login-page-dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected} ▼
      </button>
      {isOpen && (
        <ul className="login-page-dropdown-menu">
          {options.map((option, index) => (
            <p
              key={index}
              className="login-page-dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoginPageDropdown;
