
import styles from './Dashboard.module.css';
import { React, useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import moment from "moment"
import { UserContext } from '../../Context/UserContext'


export default function AdminDashboard() {

	const [doctorCount, setDoctorCount] = useState(0);
	const [patientCount, setPatientCount] = useState(0);
	const [appsTodayCount, setAppsTodayCount] = useState(0);
	const [pendingAppsTodayCount, setPendingAppsTodayCount] = useState(0);
	const [bookedAppointments, setBookedAppointments] = useState([]);
	const [doctors, setdoctor] = useState([]);
	const { currentUser } = useContext(UserContext);

	const getUserCountByRole = async (userType) => {
		const response = await axios.post(`http://localhost:3002/count/users`,
			{
				'userType': userType
			},
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`
				}
			}
		);
		let count = response.data.count
		if (count) {
			if (userType == "Expert")
				setDoctorCount(count);
			else if (userType == "Student")
				setPatientCount(count);
		}

	};

	const getAppointmentCount = async () => {
		const response = await axios.get(`http://localhost:3002/count/appointments`,
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`
				}
			}
		);
		if (response?.data?.totalAppointments) {
			setAppsTodayCount(response?.data?.totalAppointments);
		}
		if (response?.data?.pendingAppointments) {
			setPendingAppsTodayCount(response?.data?.pendingAppointments)
		}
	}

	const getBookedSlots = async () => {
		// console.log(moment(new Date()).format('YYYY-MM-DD'))
		let response = await axios.post(`http://localhost:3002/appointments`,
			{
				'isTimeSlotAvailable': false,
				'appDate': moment(new Date()).format('YYYY-MM-DD')
			},
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`
				}
			}
		);
		if (response.data.message == "success") {

			let aptms = response.data.appointments;
			console.log("aptms", aptms);

			setBookedAppointments(aptms);
			// console.log(aptms);

		}

		// else {
		// 	setBookedAppointments([]);
		// }

	}

	const getdoctors = async () => {
		const response = await axios.get("http://localhost:3002/doctors");
		setdoctor(response.data);
	};

	useEffect(() => {
		//setting count of Doctors on dashboard
		getUserCountByRole("Doctor");

		//setting count of Patients on dashboard
		getUserCountByRole("Patient");
		getAppointmentCount()
		getBookedSlots();
		getdoctors();
	}, []);

	return (
		<Box className={styles.dashboardBody} component="main" sx={{ flexGrow: 1, p: 3 }}>
			<div id={styles.welcomeBanner}>
				<div className='text-dark'>
					<h2><b>{currentUser.firstName} {currentUser.lastName}</b> 👨🏻‍⚖️</h2>
					<hr/>
					<h1  className='fw-bolder' style={{marginBottom:"10px"}}>Welcome!👋</h1>
					At ProTech💻, we believe that every Student deserves the highest quality care possible. 
					<br/>
					Our commitment to excellence in ideas is matched only by our compassion for those we serve.

				</div>

			</div>
			<div className={styles.statCardGrid}>
				<div className={["", styles.statCard].join(" ")}>
					<div className={styles.dashWidget}>
						<span className={styles.dashWidgetBg1}> <i className="fa fa-user-o" aria-hidden="true"></i></span>
						<div className={[" ", styles.dashWidgetInfo].join(" ")} >
							<h3 className={styles.dashWidgetInfoH3}>13</h3>
							<span className={styles.widgetTitle1}>Experts <i class="fa fa-check" aria-hidden="true"></i></span>
						</div>
					</div>
				</div>
				<div className={["", styles.statCard].join(" ")}>
					<div className={styles.dashWidget}>
						<span className={styles.dashWidgetBg2}><i className="fa fa-user-o" aria-hidden="true"></i></span>
						<div className={[" ", styles.dashWidgetInfo].join(" ")} >
							<h3 className={styles.dashWidgetInfoH3}>29</h3>
							<span className={styles.widgetTitle2}>Students <i class="fa fa-check" aria-hidden="true"></i></span>
						</div>
					</div>
				</div>

			</div>

			<div className="row ">
				
				<div class="col-12 col-lg-4 col-xl-4">
					<div class="card member-panel">
						<div class="card-header bg-white">
							<h2 class="card-title mb-0"><b>Experts available at Pro-Tech!</b></h2>
						</div>
						<div class="card-body">
							<ul class="contact-list">
								{doctors && doctors.map(( doc , index) => {
									return (
										<li>
											<div class="contact-cont" style={{display:"flex"}}>
												<div style={{marginLeft:"5px"}}>
													<h4><b>{index + 1}:</b></h4>
												</div>
												<div class="contact-info" style={{marginLeft:"-25px"}}>
													<h4 class="contact-name text-ellipsis">{doc.userId?.firstName} {doc.userId?.lastName}</h4>
													<span class="contact-date">{doc.department} </span>
												</div>
											</div>
										</li>
									)
								})
								}

							</ul>
						</div>
						<div class="card-footer text-center bg-white">
							<NavLink to="/doctors" className="text-muted">View all Experts</NavLink>
						</div>
					</div>
				</div>
			</div>
		</Box>
	);
}
