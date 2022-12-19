import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInput from "../../hooks/useInput";

function BookAppointment() {
	const params = useParams();

	const doctorId = params.id;
	const doctoremail = params.email;
	const [alreadyExist, setAlreadyExist] = useState(false);
	const [getData, setgetData] = useState(false);
	const [appointment, setAppointment] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const appointmentData = [];
			await axios
				.get(`${process.env.BASE_URL}/appointment.json`)
				.then(res => {
					const data = res.data;

					for (const key in data) {
						appointmentData.push({
							patientId: key,
							docid: data[key].docId,
							patientName: data[key].patientName,
							patientEmail: data[key].patientEmail,
							docEmail: data[key].docEmail,
							status: data[key].status,
							disease: data[key].disease,
						});

						setAppointment(appointmentData);
					}
				})
				.catch(error => {
					console.log(error);
				});
		};

		getData();
	}, [getData]);

	const {
		value: Name,
		isValid: NameIsValid,
		hasError: NameHasError,
		valueChangeHandler: NameChangeHandler,
		inputBlurHandler: NameBlurHandler,
	} = useInput(value => value.trim() !== "");
	const {
		value: docEmail,
		isValid: docEmailIsValid,
		hasError: docEmailHasError,
		valueChangeHandler: docEmailChangeHandler,
		inputBlurHandler: docEmailBlurHandler,
	} = useInput(value => value.includes("@"));
	const {
		value: email,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
	} = useInput(value => value.includes("@"));
	const {
		value: docId,
		isValid: docIdIsValid,
		hasError: docIdHasError,
		valueChangeHandler: docIdChangeHandler,
		inputBlurHandler: docIdBlurHandler,
	} = useInput(value => value.trim() !== "");
	const {
		value: disease,
		isValid: diseaseIsValid,
		hasError: diseaseHasError,
		valueChangeHandler: diseaseChangeHandler,
		inputBlurHandler: diseaseBlurHandler,
	} = useInput(value => value.trim() !== "");

	let formIsValid = false;
	if (NameIsValid && emailIsValid && diseaseIsValid) {
		formIsValid = true;
	}

	const handleSubmit = async e => {
		e.preventDefault();
		const data = {
			patientName: Name,
			docEmail: doctoremail,
			docId: doctorId,
			disease: disease,
			patientEmail: email,
			status: "Pending",
		};

		await axios
			.post(`${process.env.BASE_URL}/appointment.json`, data)
			.then(res => {
				setgetData(true);
				alert("Your Appointment has been noted Successfully");
			})
			.catch(error => {});
	};

	return (
		<div className="container mt-5">
			<div className="d-flex justify-content-center h-100">
				<div className="card w-75">
					<div className="card-header mt-3">
						<h2 className="text-center">Book Appointment</h2>
					</div>
					<div className="card-body">
						<form onSubmit={e => handleSubmit(e)}>
							<div
								className={NameHasError ? "invalid form-group" : "form-group"}>
								<label>Your Name:</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter your Your name"
									value={Name}
									onChange={NameChangeHandler}
									onBlur={NameBlurHandler}
								/>
								{NameHasError && (
									<p className="text-danger"> Please enter your name </p>
								)}
							</div>
							<div
								className={
									docEmailHasError
										? "invalid form-group my-3"
										: "form-group my-3"
								}>
								<label>Doctor Email:</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter your Doctor Email"
									value={doctoremail}
									readOnly
								/>
								{docEmailHasError && (
									<p className="text-danger">Please enter your doc email </p>
								)}
							</div>
							<div
								className={docIdHasError ? "invalid form-group" : "form-group"}>
								<label>Doctor Id:</label>
								<input
									type="text"
									className="form-control"
									placeholder="id"
									value={doctorId}
									readOnly
								/>
								{docIdHasError && (
									<p className="error-text"> Please enter your email</p>
								)}
							</div>
							<div
								className={
									diseaseHasError
										? "invalid form-group mt-3"
										: "form-group mt-3"
								}>
								<label>Disease:</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter your disease"
									value={disease}
									onChange={diseaseChangeHandler}
									onBlur={diseaseBlurHandler}
								/>
								{diseaseHasError && (
									<p className="text-danger">Please enter your disease </p>
								)}
							</div>
							<div
								className={
									emailHasError ? "invalid form-group mt-3" : "form-group mt-3"
								}>
								<label>Your Email:</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter Your Email"
									value={email}
									onChange={emailChangeHandler}
									onBlur={emailBlurHandler}
								/>
								{emailHasError && (
									<p className="text-danger"> Please enter your email</p>
								)}
							</div>

							<div className="form-group text-center">
								<button
									type="submit"
									disabled={!formIsValid}
									className="btn btn-success text-uppercase mt-5 text-center">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookAppointment;
