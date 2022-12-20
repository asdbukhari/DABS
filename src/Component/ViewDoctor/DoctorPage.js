import React, { useEffect, useRef, useState } from "react";
import "../Home/Home.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DoctorPage() {
  const [DoctorHistory, setDoctorHistory] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const docId = params.id;

  const docdata = JSON.parse(localStorage.getItem("docdata"));

  const filterData = docdata.filter((data) => data.id == docId);
  const fee = filterData[0].fee;

  var totalPatient = "";

  useEffect(() => {
    const getData = async () => {
      const appointmentData = [];
      await axios
        .get(`${process.env.BASE_URL}/appointment.json`)
        .then((res) => {
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

            setDoctorHistory(appointmentData);
            localStorage.setItem(
              "appointmentData",
              JSON.stringify(appointmentData)
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  const changeroute = (data) => {
    const appointment = DoctorHistory.filter((data) => data.docid == docId);
    const a = appointment.filter((data) => data.status == "Pending").length;

    if (a == 2) {
      alert("Already Extra Appointment");
    } else {
      navigate(`/appointment/${data.id}/${data.email}`);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Your Selected Doctor</h1>

      {docdata
        .filter((data) => data.id == docId)
        .map((data, index) => {
          const { id } = data;
          return (
            <div className="row container" key={index}>
              <div className=" offset-4 col-6">
                <div className="card p-2 py-3 text-center">
                  <div className="img mb-2">
                    <img className="img" src={data.image} />
                  </div>
                  <h5 className="mb-0">Dr.{data.name}</h5>
                  <small>{data.speciality}</small>
                  <div>
                    <p>{data.email}</p>
                  </div>
                  <div>
                    <p>Total Fee:Rs.{data.fee}</p>
                  </div>
                  <div className="mt-4 apointment">
                    <button
                      className="btn btn-success text-uppercase"
                      onClick={() => changeroute(data)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <h3 className="text-center mt-3"> Doctor History</h3>
      {DoctorHistory.filter((data) => data.docid == docId).length > 0 ? (
        <>
          <div className="d-flex justify-content-center mt-5">
            <h5 className="text-center mx-5">
              Total Patient:
              {DoctorHistory.filter((data) => data.docid == docId).length}
            </h5>
            <h5 className="text-center mx-5">
              Pending Patients:
              {
                DoctorHistory.filter(
                  (data) => data.docid == docId && data.status == "Pending"
                ).length
              }
            </h5>
            {/* <h5 className="text-center">
              Total Amount:
              {DoctorHistory.filter((data) => data.docid == docId).length * fee}
            </h5> */}
          </div>

          {DoctorHistory.filter((data) => data.docid == docId).map(
            (data, index) => {
              return (
                <>
                  <div key={index}>
                    <p>{totalPatient}</p>
                  </div>
                  <div className="patientcard bg-light">
                    <div className="d-flex justify-content-between">
                      <p>
                        <b>Doctor Email:</b>
                        {data.docEmail}
                      </p>
                      <p>
                        <b>Patient Email:</b>
                        {data.patientEmail}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>
                        <b>Patient Name:</b>
                        {data.patientName}
                      </p>
                    </div>
                  </div>
                </>
              );
            }
          )}
        </>
      ) : (
        <h2 className="text-center mt-5">No Appointment in Past</h2>
      )}
    </>
  );
}

export default DoctorPage;
