import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Appointment.css";

function AllAppointment() {
	const [apointment, setAppointment] = useState([]);
	const [getData, setgetData] = useState(false);
	useEffect(() => {
		const getData = async () => {
			const userdata = [];
			await axios
				.get(
					`https://doctor-app-21ad1-default-rtdb.firebaseio.com/appointment.json`
				)
				.then(res => {
					const data = res.data;

					for (const key in data) {
						userdata.push({
							patientId: key,
							docid: data[key].docId,
							patientName: data[key].patientName,
							patientEmail: data[key].patientEmail,
							docEmail: data[key].docEmail,
							status: data[key].status,
							disease: data[key].disease,
						});

						setAppointment(userdata);
					}
				})
				.catch(error => {
					console.log(error);
				});
		};

		getData();
	}, [getData]);

	const totalApponmnet = apointment.length;
	const doneAppointment = apointment.filter(
		data => data.status === "Done"
	).length;
	const pendingAppointment = apointment.filter(
		data => data.status === "Pending"
	).length;

	const accpectAppointment = async data => {
		let patientdata = {
			patientName: data.patientName,
			docEmail: data.docEmail,
			patientEmail: data.patientEmail,
			docId: data.docid,
			disease: data.disease,
			status: "Done",
		};
		console.log(data);
		await axios
			.put(
				`https://doctor-app-21ad1-default-rtdb.firebaseio.com/${data.patientId}.json`,
				patientdata
			)
			.then(res => {
				setgetData(true);
			})
			.catch(e => {
				console.log(e);
			});
	};

	return (
		<div>
			<div>
				<h2 className="text-center mt-5">Patients Appointment</h2>
				<div>
					<h3 className="text-center mb-5">
						Total Appointment:{totalApponmnet}
					</h3>
					<hr></hr>
					<div className="d-flex justify-content-center mt-5">
						<h3 className="text-center mx-5">
							Pending Appointment:{pendingAppointment}
						</h3>
						<h3 className="text-center">Done Appointment:{doneAppointment}</h3>
					</div>
				</div>
			</div>
			{apointment.length > 0 ? (
				<>
					{apointment.map((data, index) => {
						return (
							<div key={data.docEmail + index} className="row container mt-3">
								<div
									className="offset-lg-3 p-3 col-lg-7 bg-white text-center rounded"
									key={index}>
									<div className="">
										<p>
											<b>Doctor Email:</b>
											{data.docEmail}
										</p>
										<p>
											<b>Patient Email:</b>
											{data.patientEmail}
										</p>
									</div>
									<div className="">
										<p>
											<b>Patient Name:</b>
											{data.patientName}
										</p>
									</div>
									<div className="text-center">
										Status:{" "}
										<button
											className="btn btn-primary"
											onClick={() => accpectAppointment(data)}>
											{data.status}
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</>
			) : (
				<h2 className="text-center mt-5">No Appointment</h2>
			)}
		</div>
	);
}

export default AllAppointment;
