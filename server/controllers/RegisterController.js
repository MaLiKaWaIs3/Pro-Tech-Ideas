const User = require("../models/user");
const Expert = require("../models/expert");
const Student = require("../models/student");


const crypto = require('crypto');
const nodemailer = require('nodemailer');

const isUserValid = (newUser) => {
    const errorList = [];
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!newUser.firstName) {
        errorList.push('Please enter first name');
    } else if (!nameRegex.test(newUser.firstName)) {
        errorList.push('First name is invalid');
    }
    if (!newUser.lastName) {
        errorList.push('Please enter last name');
    } else if (!nameRegex.test(newUser.lastName)) {
        errorList.push('Last name is invalid');
    }

    if (!newUser.email) {
        errorList.push("Please enter email");
    } else if (!emailRegex.test(newUser.email)) {
        errorList.push("Invalid email format");
    }

    if (!newUser.password) {
        errorList.push("Please enter password");
    }
    // else if (!passwordRegex.test(newUser.password)) {
    //     errorList.push(
    //         "Password should be at least 8 characters long and contain at least one letter and one number"
    //     );
    // }

    if (!newUser.confirmPassword) {
        errorList.push("Please re-enter password in Confirm Password field");
    }

    if (!newUser.userType) {
        errorList.push("Please enter User Type");
    }

    if (newUser.password !== newUser.confirmPassword) {
        errorList.push("Password and Confirm Password did not match");
    }

    if (errorList.length > 0) {
        return { status: false, errors: errorList };
    } else {
        return { status: true };
    }
};

const saveVerificationToken = async (userId, verificationToken) => {
    await User.findOneAndUpdate({ _id: userId }, { "verificationToken": verificationToken });
    return;
}

const generateVerificationToken = () => {
    const token = crypto.randomBytes(64).toString('hex');
    const expires = Date.now() + 3 * 60 * 60 * 1000; // 3 hours from now
    let verificationToken = {
        "token": token,
        "expires": expires
    };
    return verificationToken;
};

const signUp = (req, res) => {
    const newUser = req.body;

    const userValidStatus = isUserValid(newUser);
    if (!userValidStatus.status) {
        res.json({ message: "error", errors: userValidStatus.errors });
    } else {
        User.create(
            {
                email: newUser.email,
                username: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                password: newUser.password,
                userType: newUser.userType,
            },
            (error, userDetails) => {
                if (error) {
                    res.json({ message: "error", errors: [error.message] });
                } else {
                    let verificationToken = generateVerificationToken()
                    saveVerificationToken(userDetails._id, verificationToken);

                    if (newUser.userType === "Expert") {
                        Expert.create(
                            {
                                userId: userDetails._id,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                email: newUser.email,
                                username: newUser.email
                            },
                            (error2, doctorDetails) => {
                                if (error2) {
                                    User.deleteOne({ _id: userDetails });
                                    res.json({ message: "error", errors: [error2.message] });
                                } else {
                                    // let resp = sendVerificationEmail(userDetails.email, verificationToken.token);
                                    res.json({ message: "success" });
                                }
                            }
                        );
                    }
                    if (newUser.userType === "Student") {
                        Student.create(
                            {
                                userId: userDetails._id,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                email: newUser.email,
                                username: newUser.email
                            },
                            (error2, patientDetails) => {
                                if (error2) {
                                    User.deleteOne({ _id: userDetails });
                                    res.json({ message: "error", errors: [error2.message] });
                                } else {
                                    // let resp = sendVerificationEmail(userDetails.email, verificationToken.token);
                                    res.json({ message: "success" });
                                }
                            }
                        );
                    }
                }
            }
        );
    }
};

module.exports = {
    signUp
}

