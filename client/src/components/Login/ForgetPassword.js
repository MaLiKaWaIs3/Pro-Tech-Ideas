import React, { useState } from "react";
import styles from "./Login.module.css";
import styling from "../SignUp/SignUp.module.css";
import logo from "../../assets/img/logo 1 bg.png";

import OTPForm from "./Otpform";

const ForgotPasswordAndOTP = () => {
  const [email, setEmail] = useState("");
  const [otpInputs, setOTPInputs] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);

  const buttonRef = React.createRef();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your backend to send the OTP
    try {
      const response = await fetch("http://localhost:3002/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("OTP sent successfully.");
        setShowOTPForm(true);
      } else {
        setMessage(`Failed to send OTP \n Enter Correct Email.`);
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (
    <div id={styles.loginBody}>
      <div className={styles.parent}>
        {showOTPForm ? (
          <OTPForm email={email} />
        ) : (
          <>
            <div className={styles.logoParent}>
              <img src={logo} className={styles.logoImg} alt="" />
            </div>
            <div className={styles.formparent}>
              <form onSubmit={handleEmailSubmit} className={styles.formstyle}>
                <br />
                <p className={styles.logMess}>Forgot Password</p>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email ..."
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className={styles.loginInput}
                />
                <br />
                <div className={styles.buttonParent}>
                  <button className={styles.otpButton}>Get OTP</button>
                </div>
              </form>
            </div>
            {/* <h2 >Forgot Password</h2>
                <form onSubmit={handleEmailSubmit} className="forgot-password-form">
                      <div className='form-floating col-12 mx-2'>
                            
                            <label htmlFor="email" >Email</label>
                        </div>
                  <button id={styles.loginBtn} className='d-block m-auto mt-4 px-4' > Get OTP  </button>
                </form> */}
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordAndOTP;
