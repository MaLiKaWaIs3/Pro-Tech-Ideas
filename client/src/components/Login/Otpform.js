import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import styling from "../SignUp/SignUp.module.css";
import logo from "../../assets/img/logo 1 bg.png";

function OTPForm({ email }) {
  const [otpValues, setOTPValues] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef([]);
  const buttonRef = useRef(null);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const navigate = useNavigate();
  const [otpVerified, setOTPVerified] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    otpInputs.current[0].focus();
  }, []);

  const handleInputChange = (index, value) => {
    const updatedOTPValues = [...otpValues];
    updatedOTPValues[index] = value;

    setOTPValues(updatedOTPValues);

    if (value && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].removeAttribute("disabled");
      otpInputs.current[index + 1].focus();
    }

    if (otpValues[5] !== "") {
      buttonRef.current.classList.add("active");
    } else {
      buttonRef.current.classList.remove("active");
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otpValues.join("");

    setIsVerifyingOTP(true);

    try {
      const response = await fetch("http://localhost:3002/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: enteredOTP }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOTPVerified(true);
        setMessage("Verified Successfully!");
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
      }
    } catch (error) {
      // Handle errors
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://localhost:3002/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: resetPassword }),
      });

      if (response.ok) {
        navigate("/login");
        alert("Password Reset Successfully");
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
      }
    } catch (error) {
      // Handle errors
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      if (!otpValues[index]) {
        otpInputs.current[index - 1].focus();
        otpInputs.current[index].setAttribute("disabled", true);
      }
    }
  };

  return (
    <>
      {otpVerified ? (
        <>
                  <div className={styling.logoParentOTP}>
            <img src={logo} className={styles.logoImg} alt="" />
          </div>
          
          <form className="reset-password-form" id={styling.resetForm}>
          <h3 >Reset Your Password</h3>
          <br/>
            <input
              type="password"
              placeholder="New Password"
              className="form-control"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
            /> 
            <br/>
            <button
              className={styles.otpButton}
              onClick={handleResetPassword}
            >
              Reset
            </button>
          </form>
        </>
      ) : (
        <div className={styling.OTP}>
          <div className={styling.logoParentOTP}>
            <img src={logo} className={styles.logoImg} alt="" />
          </div>
          <h3>Enter Your 6 Digit OTP</h3>
          <form className={styling.otpform}>
            <div className={styling.input_field_box}>
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  ref={(el) => (otpInputs.current[index] = el)}
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={index > 0 && !otpValues[index - 1]}
                />
              ))}
            </div>
            <button
              className={styling.otpbtn}
              ref={buttonRef}
              onClick={handleVerifyOTP}
              disabled={isVerifyingOTP}
            >
              {isVerifyingOTP ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          
      <p className="mt-3" style={{backgroundColor:"white"}}>{message}</p>
        </div>
      )}
    </>
  );
}

export default OTPForm;
