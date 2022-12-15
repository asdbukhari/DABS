import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
	const [docData, setDocData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getData = async () => {
			const userdata = [];
			await axios
				.get(
					"https://final-react-6a6ca-default-rtdb.firebaseio.com/doctor.json"
				)
				.then(res => {
					const data = res.data;

					setDocData(data);

					for (const key in data) {
						userdata.push({
							id: data[key].id,
							name: data[key].name,
							age: data[key].age,
							speciality: data[key].speciality,
							email: data[key].email,
							image: data[key].image,
							fee: data[key].fee,
						});
						localStorage.setItem("docdata", JSON.stringify(userdata));
						setDocData(userdata);
					}
				})
				.catch(error => {
					console.log(error);
				});
		};

		getData();
	}, []);

	const changeroute = id => {
		console.log(id);
		navigate(`/doctor/${id}`);
	};

	return (
		<>
			<div className="container mt-5 mb-5">
				<h1 className="text-center my-5">Doctors List</h1>

				<div className="row g-2">
					{docData.length > 0 ? (
						<>
							<div className="d-flex align-items-center justify-content-center">
								<h3>
									Heart Specialist =
									{
										docData.filter(
											data => data.speciality === "Heart Specialist"
										).length
									}
								</h3>
								<h3 className="mx-5">
									Lung Specialist =
									{
										docData.filter(
											data => data.speciality === "Lung Specialist"
										).length
									}
								</h3>
								<h3>
									Eye Specialist =
									{
										docData.filter(data => data.speciality === "Eye Specialist")
											.length
									}
								</h3>
							</div>
							{docData.map((data, index) => {
								const { id } = data;
								return (
									<div
										onClick={() => changeroute(id)}
										className="col-md-4"
										key={index}>
										<div className="card p-2 py-3 text-center">
											<div className=" mb-2">
												{" "}
												<img className="img-fluid" src={data.image} />{" "}
											</div>
											<h5 className="mb-0">Dr.{data.name}</h5>{" "}
											<small>{data.speciality}</small>
											<div>
												<p>{data.email}</p>
											</div>
											<div>
												<p>Total Fee:Rs.{data.fee}</p>
											</div>
										</div>
									</div>
								);
							})}
						</>
					) : (
						<h3>No Doctor Found</h3>
					)}
				</div>
			</div>
		</>
	);
}

export default Home;
