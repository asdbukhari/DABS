import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Navbar from "./Component/Navbar/Navbar";
import DoctorPage from "./Component/ViewDoctor/DoctorPage";
import BookAppointment from "./Component/BookAppointment/BookAppointment";
import AllAppointment from "./Component/AllAppointment/AllAppointment";
import "./App.css";

function App() {
  const [isLoggedIn] = useState(true);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor/:id" element={<DoctorPage />}></Route>
        <Route path="/appointment/:id/:email" element={<BookAppointment />}></Route>
        {isLoggedIn && <Route path="/allappointment" element={<AllAppointment />}></Route>}
      </Routes>
    </>
  );
}

export default App;
