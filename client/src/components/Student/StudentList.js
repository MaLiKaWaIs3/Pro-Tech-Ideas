import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import Box from '@mui/material/Box';
import PatientTable from '../MUITable/StudentTable';

function StudentList() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    const [patients, setPatient] = useState([]);

    const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const handleDialogueOpen = () => {
        setErrorDialogueBoxOpen(true)
    };
    const handleDialogueClose = () => {
        setErrorList([]);
        setErrorDialogueBoxOpen(false)
    };

    useEffect(() => {
        getPatients();
    }, []
    );

    const getPatients = async () => {
        const response = await axios.get("http://localhost:3002/patients", {
            params: {
                name: name
            }
        });
        setPatient(response.data);
    };

    const deletePatient = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/patients/${id}`);
            getPatients();
        } catch (error) {
            setErrorList(error);
            handleDialogueOpen();
        }
    };


    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            <div className="page-wrapper">
                <div className="content mt-4">
                    <div className="row">
                        <div className="col-sm-4 col-3">
                            <h4 className="page-title">Students</h4>
                        </div>
                        <div className="col-sm-8 col-9 text-right m-b-20">
                            <Link to="/patients/add">
                               <button style={{backgroundColor:"black" , color:"white" , border:"none" , outline:"none" , padding:"10px 15px" , borderRadius:"5px"}}> <i className="fa fa-plus"></i> Add Student</button>
                            </Link>
                        </div>
                    </div>
                    <form action="/patients" name="userFilter" >
                        <div className="row filter-row">

                            <div className="col-sm-4 col-md-4">
                                <div className="form-floating">
                                    <input type="text" name="name" className="form-control" placeholder='Patient Name' />
                                    <label className="focus-label">Student Name</label>
                                </div>
                            </div>

                            <div className="col-sm-4 col-md-4">
                                <button type="submit" style={{backgroundColor:"black" , color:"white" , border:"none" , outline:"none" , padding:"10px 15px" , borderRadius:"5px"}}> Search </button>
                            </div>
                        </div>
                    </form>
                    <PatientTable patientList={patients} deletePatient={deletePatient} />
                  
                </div>
                <ErrorDialogueBox
                    open={errorDialogueBoxOpen}
                    handleToClose={handleDialogueClose}
                    ErrorTitle="Error: Add Patient"
                    ErrorList={errorList}
                />
            </div>

        </Box>
    )
}

export default StudentList;
