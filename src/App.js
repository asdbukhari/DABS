import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Navbar from "./Component/Navbar/Navbar";
import DoctorPage from "./Component/ViewDoctor/DoctorPage";
import BookAppointment from "./Component/BookAppointment/BookAppointment";
import AllAppointment from "./Component/AllAppointment/AllAppointment";
import { useState } from "react";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	return (
		<>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/doctor/:id" element={<DoctorPage />}></Route>
				<Route
					path="/appointment/:id/:email"
					element={<BookAppointment />}></Route>
				{isLoggedIn && (
					<Route path="/allappointment" element={<AllAppointment />}></Route>
				)}
				{/* {!isLoggedIn && <Route path="allappointment" element={<><h2 className="text-center mt-5">You are not logged in</h2></>}></Route>} */}
			</Routes>
		</>
	);
}

export default App;
