
import styles from './Dashboard.module.css';
import { React, useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { UserContext } from '../../Context/UserContext'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import moment from "moment"




export default function DoctorDashboard() {
	const { currentUser } = useContext(UserContext);
	const [appsTodayCount, setAppsTodayCount] = useState(0);
	const [pendingAppsTodayCount, setPendingAppsTodayCount] = useState(0);
	const [bookedAppointments, setBookedAppointments] = useState([]);
	const [patientsTreatedCount,setPatientsTreatedCount] = useState([]);
	const [prescriptions, setPrescription] = useState([]);


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

	const getPatientsTreatedCount = async () => {
		const response = await axios.get(`http://localhost:3002/count/patients/treated`,
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`
				}
			}
		);
		if (response?.data?.treatedPatients) {
			setPatientsTreatedCount(response?.data?.treatedPatients);
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
	const getPrescription = async () => {
        
        let response = await axios.post(`http://localhost:3002/prescriptions`,{},
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        if (response.data.message == "success") {
            let respPrescription = response.data.prescriptions;
            let newResp =respPrescription.sort((a, b) => {
                    const timeA = new Date(`${moment(new Date(a.appointmentId.appointmentDate.slice(0, -1))).format('MM/DD/YYYY')} ${a.appointmentId.appointmentTime}`);
                    const timeB = new Date(`${moment(new Date(b.appointmentId.appointmentDate.slice(0, -1))).format('MM/DD/YYYY')} ${b.appointmentId.appointmentTime}`);
                    console.log(timeA)
                    return timeB - timeA;
                });
              console.log(newResp);
            setPrescription(newResp);
        } else {

        }
    };

	useEffect(() => {
		//setting count of Doctors on dashboard
		getAppointmentCount()
		getBookedSlots();
		getPatientsTreatedCount();
		getPrescription();
	}, []);


	return (
		<Box className={styles.dashboardBody} component="main" sx={{ flexGrow: 1, p: 3 }}>
			<div id={styles.welcomeBanner}>
			<div className='text-dark'>
					<h2><b>{currentUser.firstName} {currentUser.lastName}</b> 👨🏻‍🏫</h2>
					<hr/>
					<h1  className='fw-bolder' style={{marginBottom:"10px"}}>Welcome!👋</h1>
					At ProTech💻, we believe that every Student deserves the highest quality care possible. 
					<br/>
					Our commitment to excellence in ideas is matched only by our compassion for those we serve.

				</div>

			</div>
			<div className={styles.statCardGridDoctor}>
				<div className={["", styles.statCard].join(" ")} style={{height:"100px"}}>
                        <div className={styles.dashWidget}>
                            <span className={styles.dashWidgetBg2}><i className="fa fa-user-o" aria-hidden="true"></i></span>
                            <div className={[" ", styles.dashWidgetInfo].join(" ")} >
                                <h3 className={styles.dashWidgetInfoH3}>{patientsTreatedCount}</h3>
                                <span className={styles.widgetTitle2}>Total ideas <i class="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    {/* <div className={["", styles.statCard].join(" ")}>
                        <div className={styles.dashWidget}>
                            <span className={styles.dashWidgetBg3}><i className=" fa fa-calendar" aria-hidden="true"></i></span>
                            <div className={[" ", styles.dashWidgetInfo].join(" ")} >
                                <h3 className={styles.dashWidgetInfoH3}>{appsTodayCount}</h3>
                                <span className={styles.widgetTitle3}>Appointments Today <i class="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className={["", styles.statCard].join(" ")}>
                        <div className={styles.dashWidget}>
                            <span className={styles.dashWidgetBg4}><i className="fa fa-heartbeat" aria-hidden="true"></i></span>
                            <div className={[" ", styles.dashWidgetInfo].join(" ")} >
                                <h3 className={styles.dashWidgetInfoH3}>{pendingAppsTodayCount}</h3>
                                <span className={styles.widgetTitle4}>Pending Appointments <i class="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div> */}
			</div>

			
		</Box>
	);
}
