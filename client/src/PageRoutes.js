import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';

import LoginPage from './components/Login/Login'

//import SignupPage from './pages/SignupPage';
import SignupPage from './components/SignUp/SignupPage';


import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';

import AddUser from './components/User/AddUser3';
import UserList from "./components/User/UserList3";
import EditUser from "./components/User/EditUser3";
import User from './components/User/User';


import AddStudent from './components/Student/AddStudent';
import StudentList from "./components/Student/StudentList";
import EditStudent from "./components/Student/EditStudent";
import Student from './components/Student/Student';

import AddExpert from './components/Expert/AddExpert';
import ExpertList from "./components/Expert/ExpertList";
import EditExpert from "./components/Expert/EditExpert";
import Expert from './components/Expert/Expert';


import { UserContext } from './Context/UserContext'
import StudentDashboard from './components/dashboard/StudentDashboard';
import ExpertDashboard from './components/dashboard/ExpertDashboard';

import DoctorProfile from './components/Profile/ExpertProfile';
import PatientProfile from './components/Profile/StudentProfile';
import AdminProfile from './components/Profile/AdminProfile';

import ForgetPassword from './components/Login/ForgetPassword'
import OTPForm from './components/Login/Otpform'


import Ideas from './components/Ideas/uploadideas';
import UploadIdeas from './components/Ideas/uploadideas';
import Idealist from './components/Ideas/Idealist';
import ProjectIdealist from './components/Ideas/ProjectIdeasList';

const NotFound = () => <h2 style={{ margin: '70px' }}>This Path is not available</h2>

function ProtectedAdminRoute({ children }) {
    const { currentUser } = useContext(UserContext);
    if (currentUser.userType == "Admin") {
        return children;
    }
}

function ProtectedStaffRoute({ children }) {
    const { currentUser } = useContext(UserContext);
    if (currentUser.userType == "Admin" || currentUser.userType == "Expert") {
        return children;
    }
}

export default function PageRoutes() {
    const { currentUser } = useContext(UserContext);
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} >
                <Route index element={
                    currentUser.userType == "Admin" ?
                        <AdminDashboard /> :
                        currentUser.userType == "Expert" ?
                            <ExpertDashboard /> :
                            currentUser.userType == "Student" ?
                                <StudentDashboard /> :
                                <div />}
                />
                <Route path='users' element={<ProtectedAdminRoute>  <User /> </ProtectedAdminRoute>} >
                    <Route index element={<UserList />} />
                    <Route path='add' element={<AddUser />} />
                    <Route path="edit/:id" element={<EditUser />} />
                </Route>

                <Route path='students' element={<ProtectedAdminRoute>  <Student /> </ProtectedAdminRoute>} >
                    <Route index element={<StudentList />} />
                    <Route path='add' element={<AddStudent />} />
                    <Route path="edit/:id" element={<EditStudent />} />
                </Route>

                <Route path='experts' element={<ProtectedAdminRoute>  <Expert /> </ProtectedAdminRoute>} >
                    <Route index element={<ExpertList />} />
                    <Route path='add' element={<AddExpert />} />
                    <Route path="edit/:id" element={<EditExpert />} />
                </Route>
                <Route path="uploadideas" element={<UploadIdeas />} />
                <Route path="ideas" element={<Idealist />} />
                <Route path="projectideas" element={<ProjectIdealist />} />
                


                <Route path='profile' element={
                    currentUser.userType == "Admin" ?
                        <AdminProfile /> :
                        currentUser.userType == "Expert" ?
                            <DoctorProfile /> :
                            currentUser.userType == "Student" ?
                                <PatientProfile /> :
                                <div />}
                />

                <Route path='/profile' element={<DoctorProfile />} />

            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />

            <Route path='/getotp' element={<ForgetPassword />} />
            <Route path='/Otpform' element={<OTPForm />} />
            <Route path='/ideas' element={<Ideas />} />
            <Route path='/*' element={<NotFound />} />

        </Routes>
    )
}