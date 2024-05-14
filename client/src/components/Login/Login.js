import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import { UserContext } from '../../Context/UserContext'
import styled from '../SignUp/SignUp.module.css'
import logo1 from '../../assets/img/logo 1 bg.png'
import { Widgets } from '@mui/icons-material';

function Login() {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const { signInUser } = useContext(UserContext);

    const handleDialogueOpen = () => {
        setErrorDialogueBoxOpen(true)
    };
    const handleDialogueClose = () => {
        setErrorList([]);
        setErrorDialogueBoxOpen(false)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Handle login form submission
        const form = document.forms.loginForm;
        let user = {
            email: form.email.value,
            password: form.password.value
        }
        fetch('http://localhost:3002/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                let respMessage = data.message;
                let user = data.user;
                if (respMessage === "success") {
                    signInUser(user, data.token);
                    navigate("/");
                }
                else {
                    //TODO: display error message
                    setErrorList(data.errors);
                    handleDialogueOpen();
                }
            });
    };

    const signUpClicked = () => {
        navigate("/signup");
    }
    const getotpform = () => {
        navigate("/getotp");
    }

    return (
        <div id={styles.loginBody}>
            <div className={styles.parent}>
                    <div className={styles.logoParent}>
                    <img src={logo1} alt='Logo' className={styles.logoImg} />
                    </div>
                    <div className={styles.formParent}>
                        <form onSubmit={handleSubmit} className={styles.formstyle} name="loginForm" id="loginForm">
                        <br/>
                        <p className={styles.logMess}>Login to Pro Tech</p>
                        <br />
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
                        <br/>
                        <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter Your Password ..."
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                className={styles.loginInput} 
                            />
                        <br/>
                        <p onClick={getotpform} className={styles.forPass}>Forgot Password?</p>
                       
                        <div className={styles.buttonParent}>
                            <button className={styles.buttons} id={styles.loginBtn} type="submit">Login</button>
                            <button className={styles.buttons} onClick={signUpClicked}>Signup</button>
                        </div>
                        </form>
                    </div>















                    {/* <p className='text-white'>Please login to your account</p>
                    <form onSubmit={handleSubmit} className="col-6" name="loginForm" id="loginForm">
                        <div className='form-floating mt-4 col-12 mx-2'>

                            <label htmlFor="email" >Email</label>
                        </div>

                        <div className='form-floating mt-4 col-12 mx-2'>

                            <label htmlFor="password">Password</label>
                            <span className={styled.passwordtoggleicon} onClick={togglePasswordVisibility}>
                                <i className={`fas ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                        </div>
                        <div className='d-flex justify-content-end mt-2 forget'>
                            <span  className="password text-white">Forget Password? </span>
                        </div>
                        <div className='d-flex flex-column flex-md-row  mx-2 mt-5 justify-content-between'>
                            <button className='col-12 col-md-6' >Login</button>
                            <button className={["col-12 col-md-6 mt-3 mt-md-0", styles.signUpBtn].join(" ")}  >Sign Up</button>
                        </div>
                    </form> */}
                
            </div>
            <ErrorDialogueBox
                open={errorDialogueBoxOpen}
                handleToClose={handleDialogueClose}
                ErrorTitle="Login Error"
                ErrorList={errorList}
            />
        </div>
    );
}

export default Login;
