import React from "react";

const OtpInput = (props) => {
  const { length } = props;
  return (
    <div>
      <p>{length}</p>
    </div>
  );
};

export default OtpInput;
