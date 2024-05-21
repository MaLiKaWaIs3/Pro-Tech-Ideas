import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorDialogueBox from "../MUIDialogueBox/ErrorDialogueBox";
import logo from "../../assets/img/logo 1 bg.png"

function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [passwordMatchDisplay, setPasswordMatchDisplay] = useState("none");
  // const [passwordValidationDisplay, setPasswordValidationDisplay] = useState('none')
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [CpasswordVisible, setCPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleCPasswordVisibility = () => {
    setCPasswordVisible(!CpasswordVisible);
  };

  const handleDialogueOpen = () => {
    setErrorDialogueBoxOpen(true);
  };
  const handleDialogueClose = () => {
    setErrorList([]);
    setErrorDialogueBoxOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle signup form submission'
    const form = document.forms.signUpform;
    let user = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      userType: form.userType.value,
    };
    fetch("http://localhost:3002/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        let respMessage = data.message;
        if (respMessage === "success") {
          navigate("/login");
        } else {
          //TODO: display error message
          setErrorList(data.errors);
          handleDialogueOpen();
        }
      });
  };

  useEffect(() => {
    if (password.length > 0 && password?.trim()?.length <= 6) {
      setPasswordValidationMessage(
        "Password Length must be greater than 6 characters"
      );
      // setPasswordValidationDisplay('block');
    } else {
      setPasswordValidationMessage("");
      // setPasswordValidationDisplay('none');
    }
    if (password === confirmPassword) {
      setPasswordMatchDisplay("none");
    } else {
      setPasswordMatchDisplay("block");
    }
  }, [password, confirmPassword]);

  return (
    <div id={styles.signUpBody}>
      <div className={styles.mainParent}>
        <div className={styles.logoParent}>
          <img src={logo} alt="logo" />
        </div>
  
        <form id={styles.signUpform} name="signUpform" onSubmit={handleSubmit}>
          <h2 className="text-center  mt-3">Create An Account</h2>
          <br />

          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          /> 
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="form-control"
          />

          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            required
            placeholder="Password"
          />
          {/* <span className={styles.passwordtoggleicon} onClick={togglePasswordVisibility}>
              <i className={`fas ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </span> */}

          <div className="mx-2 text-danger"> {passwordValidationMessage}</div>

          <input
            type={CpasswordVisible ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="form-control"
            required
            placeholder="Confirm Password"
          />
          {/* <span className={styles.passwordtoggleicon} onClick={toggleCPasswordVisibility}>
              <i className={`fas ${CpasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </span> */}

          <div
            className="mx-2 text-danger"
            style={{
              display: `${passwordMatchDisplay}`,
            }}
          >
            {" "}
            Password did not match
          </div>
          <label
            htmlFor="userType"
            style={{ marginTop:"5px" , fontSize: "20px", paddingLeft: "25px",  }}
          >
            Select User Type:
          </label>
          <select
            id="userType"
            name="userType"
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
            className="form-select"
            required
          >
            <option value="Student">Student</option>
            <option value="Expert">Expert</option>
            <option value="Admin">Admin</option>
          </select>

          <div className="form-group form-check mt-3 mx-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms-chkbox"
              required
            />
            <label
              className=""
              htmlFor="terms-chkbox"
              style={{ fontSize: "15px" }}
            >
              I agree with the terms and conditons
            </label>
          </div>
          <div className="text-center">
            <button id={styles.signUpBtn} type="submit">
              Sign Up
            </button>
          </div>
          <div className="text-center  fw-bold mb-5 mt-1">
            Already have an account?{" "}
            <NavLink to="/login" className="px-3" exact>
              Sign In
            </NavLink>
          </div>
        </form>
        
      </div>
      <ErrorDialogueBox
        open={errorDialogueBoxOpen}
        handleToClose={handleDialogueClose}
        ErrorTitle="Error Signing Up"
        ErrorList={errorList}
      />
    </div>
  );
}

export default SignupPage;
