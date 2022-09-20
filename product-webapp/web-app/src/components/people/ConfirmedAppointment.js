import '../../styles/people/appointment.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { Modal } from "react-bootstrap";
import { useState ,useEffect } from "react";
import button from "bootstrap";

import { Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import { DateRange } from '@mui/icons-material';
import Sidebar from '../side-nav-drawer/Sidebar'
import axios from 'axios';

var emailtoPass = localStorage.getItem("userEmailId");
/**
 * Open Popup
 */
// function ConfirmedAppointmentPopup() {

//   const [show, setConfirmedAppointment] = useState(false);

//   return (
//     <>
//       <button onClick={() => setConfirmedAppointment(true)}>Booked slots</button>
//       <Modal size="lg" show={show} onHide={() => setConfirmedAppointment(false)} aria-labelledby="example-modal-sizes-title-md">
//         <Modal.Header className="appt-modal-header" closeButton>
//           <Modal.Title id="appt-modal-sizes-title-lg">Confirmed Appointment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body><ConfirmedAppointmentContent></ConfirmedAppointmentContent></Modal.Body>
//       </Modal>
//     </>
//   );
// }

const VaccineInfo = (vc) => {
  console.log(vc,"vcccc");
  var date = (vc.vc.slot.date).split("T")[0];
  return (
    <div className='row div-vaccine-info'>
      <div className='col-4'>
        <VaccinesIcon sx={{ fontSize: 15 }} className="me-2 ms-0"/> Vaccine Name: {vc.vc.vaccine}
      </div>
      <div className='col-4'>
        <DateRange sx={{ fontSize: 15 }} className="me-2"/>Date : {date}
      </div>
    </div>
  );
}

function ConfirmedAppointment() {
  const [renderFlag, setRenderFlag] = useState(false);
  const [bookedSlot, setBookedSlot] = useState({});

  if (renderFlag == false) {
    fetchBookedSlot(emailtoPass);
    setRenderFlag(true);
  }

// API to fetch booked slot by email id.
 function fetchBookedSlot(emailId) {
  // let url = "http://localhost:8080/slot-booking-service/api/v1/getByUserEmail/" + emailId;
  let url = "http://44.207.171.169:8080/slot-booking-service/api/v1/getByUserEmail/" + emailId;
  axios.get(url).then(res=>{
    var vdata = res.data;
    console.log(vdata,"ghghg");
    if(vdata.slot.status == "BOOKED"){
        setBookedSlot(vdata);
        
        }
        else{
          setBookedSlot({});
        }
  });
}

const Button = () => {
var slotID = bookedSlot.slot.slotId; 
  return (
    <div className="row">
      <div className="col-12 text-end">
        <button className='btn  btn-danger button-div' onClick={() => cancelBookedSlot(slotID)}>Cancel </button>
      </div>
    </div>
  );
}

function cancelBookedSlot(slotId) {

  // let url = "http://localhost:8080/slot-booking-service/api/v1/slot/status/" + slotId + "?status=AVAILABLE";
  let url = "http://44.207.171.169:8080/slot-booking-service/api/v1/slot/status/" + slotId + "?status=AVAILABLE";
  return fetch(url,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "PUT"
    }).then((result) => {
      if (result.status === 202) {
        return Promise.resolve("Your appointment canceled successfully!!")
      } else {
        return Promise.reject("Unable to cancel booked slot");
      }
    }).then(msg => {
      fetchBookedSlot(emailtoPass);
      return msg;
    }).catch(error => {  })
};


  function Confirmed() {

    const { register, getValues, handleSubmit, watch, formState: { isValid, touchedField, errors } } = useForm({
      mode: "onBlur"
    })
    return (
      <div className='container mt-5'>
     
        <div className='booked-slot-title'>
          <h2>Booked Slot</h2>
        </div>
        <div className='col-12'>
        {console.log(bookedSlot , "KDS")}
        {Object.keys(bookedSlot).length !== 0 ?
          <Card>
            <Card.Body>
              <Card.Title><LocalHospitalIcon className="me-2"/>{bookedSlot.vaccinationCenterName}</Card.Title>
              <Card.Title className="mb-2 text-muted"><AddLocationIcon className="me-2"/>{bookedSlot.location.city} , {bookedSlot.location.state} , {bookedSlot.location.country} , {bookedSlot.location.pincode}</Card.Title>
              <Card.Subtitle className="mb-2 ms-2" ><VaccineInfo vc={bookedSlot}/></Card.Subtitle>
              <Card.Title className="mb-2 text-muted pt=10px"><AccountCircleOutlinedIcon sx={{ fontSize: 20 }} className="me-2"/>{bookedSlot.userName}</Card.Title>
              <Card.Title className="mb-2 text-muted pt=10px"><ContactPageOutlinedIcon /><span className="me-1"/> User id:  {bookedSlot.id}</Card.Title>
              <Card.Subtitle className="Timeslot pt=10px"> <AccessTimeOutlinedIcon sx={{ fontSize: 15 }} /><span className="me-2"/> {bookedSlot.slot.time}</Card.Subtitle>
              <Button />
            </Card.Body>
          </Card> : "" }
        </div> 
      </div>
    );
  }
  return (
    <>
      <div className="section section-booked-slot">
        <Sidebar />
        <Confirmed slot={bookedSlot} />
      </div>
    </>
  )
}

export default ConfirmedAppointment;