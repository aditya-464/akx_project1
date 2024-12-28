import React, { useEffect, useRef, useState } from "react";
import "./OtpForm.css";
import otp_img from "../../assets/images/login2.webp";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../redux/page";
import axios from "axios";

const OtpForm = () => {
  const [length, setLength] = useState(6);
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [finalOtp, setFinalOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(59);
  const { currentUser, tenant } = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      setFinalOtp(combinedOtp);
    }

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  // timer functionality
  useEffect(() => {
    if (timeLeft <= 0) return; // Stop the timer when it reaches 0

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount or re-render
  }, [timeLeft]);

  const otpVerifyFunction = async () => {
    try {
      if (finalOtp.length == 6 && currentUser && tenant) {
        const headers = {
          "X-TenantID": tenant,
        };

        const body = {
          userId: currentUser.id,
          otp: finalOtp,
        };

        const response = await axios.post("/userProfile/verify", body, {
          headers,
        });

        if (response.status === 200) {
          dispatch(changePage("home"));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="otp-form-container">
      <div className="otp-image-div">
        <img src={otp_img}></img>
        <div className="black-overlay"></div>
      </div>
      <div className="otp-content-div">
        <div className="otp-content">
          <p className="otp-ask-text">Please verify your OTP</p>
          <p className="otp-text">Enter here</p>

          <div className="otp-input-div">
            {otp.map((value, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  ref={(input) => (inputRefs.current[index] = input)}
                  value={value}
                  onChange={(e) => handleChange(index, e)}
                  onClick={() => handleClick(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                />
              );
            })}
          </div>

          <div className="otp-button" onClick={otpVerifyFunction}>
            <p>Submit</p>
          </div>

          <div className="resend-div">
            <p className="resend-ask-text">Did not receive OTP?</p>
            <p
              className="resend-text"
              style={{
                color: timeLeft > 0 ? "#9ba2a7" : "#03c988",
                fontWeight: timeLeft > 0 ? "400" : "500",
                cursor: timeLeft > 0 ? "default" : "pointer",
              }}
            >
              Resend
            </p>
            {timeLeft > 0 && <p className="time">{timeLeft}s</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
