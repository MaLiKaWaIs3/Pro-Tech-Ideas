
import styles from './Dashboard.module.css';
import { React, useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { UserContext } from '../../Context/UserContext'
import axios from "axios";
import moment from "moment"

export default function PatientDashboard() {
	const { currentUser } = useContext(UserContext);
	const [prescriptions, setPrescription] = useState([]);

	const getAppMonth = (dateOfJoining) => {
		if(!dateOfJoining){
			return;
		}
        // console.log("dateOfJoining",dateOfJoining);
        let month = new Date(dateOfJoining.slice(0, -1)).getMonth();
        // console.log("dateOfJoining",dateOfJoining);
		let monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        return monthList[month];
    }

	const getAppDate = (dateOfJoining) => {
		if(!dateOfJoining){
			return;
		}
        // console.log("dateOfJoining",dateOfJoining);
        let date = new Date(dateOfJoining.slice(0, -1)).getDate();
        // console.log("dateOfJoining",dateOfJoining);
        return date;
    }

	const getAppYear = (dateOfJoining) => {
		if(!dateOfJoining){
			return;
		}
        // console.log("dateOfJoining",dateOfJoining);
        let year = new Date(dateOfJoining.slice(0, -1)).getFullYear();
        // console.log("dateOfJoining",dateOfJoining);
        return year;
    }

	return (
		<Box className={styles.dashboardBody} component="main" sx={{ flexGrow: 1, p: 3 }}>
			<div id={styles.welcomeBanner}>
			<div className='text-dark'>
					<h2><b>{currentUser.firstName} {currentUser.lastName}</b> 👨🏻‍🎓</h2>
					<hr/>
					<h1  className='fw-bolder' style={{marginBottom:"10px"}}>Welcome!👋</h1>
					At ProTech💻, we believe that every Student deserves the highest quality care possible. 
					<br/>
					Our commitment to excellence in ideas is matched only by our compassion for those we serve.

				</div>

			</div>

			<div className='row mt-5 justify-content-center'>

				<div className='col-md-6 col-sm-12'>
				<div className='customPatientApt mx-auto' >
						<div className='topicHeader'>
							<h3 className='text-center'>Student History</h3>
						</div>
						<div className='topicContent'>
							{prescriptions[0]?.appointmentId &&
								<div className='contentCard'>
									<div className='apDate'>
										<p className='date'>{getAppDate(prescriptions[0]?.appointmentId?.appointmentDate)}</p>
										<p>{getAppMonth(prescriptions[0]?.appointmentId?.appointmentDate)}</p>
										<p>{getAppYear(prescriptions[0]?.appointmentId?.appointmentDate)}</p>
									</div>
									<div className='apDetails'>
										<p className='py-2'>
											<span className='fw-bold'>Expert Name </span>: {prescriptions[0]?.appointmentId?.doctorId?.userId?.firstName} {prescriptions[0]?.appointmentId?.doctorId?.userId?.lastName}
										</p>
										<p className='py-2'>
											<span className='fw-bold'>Department </span>: {prescriptions[0]?.appointmentId?.doctorId?.department} 
										</p>
										<p className='py-2'>
											<span className='fw-bold'> Experts's Remarks </span> : {prescriptions[0]?.remarks} 
										</p>
									</div>
								</div>
							}
							{!prescriptions[0]?.appointmentId && <div className='contentCard-empty'>
									<p className='fw-bolder'>You have no Planning History</p>
								</div>
							}
							
						</div>
					</div>
				</div>
			</div>
			
		</Box>
	);
}
