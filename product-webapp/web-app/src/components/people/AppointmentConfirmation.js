import '../../styles/people/appointment.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { Modal } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useState, setTodos } from 'react';
import { useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { AspectRatio, DateRange } from '@mui/icons-material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';

var cardDatenew;
var apt = {};
var isAppointmentConfirmed = false; //used to manage confirm button class
const VaccinatorCard = (props) => {

  return (
    <div className='Container-fluid'>
      <div className='col-12'>
        <Card>
          <Card.Body>
            <Card.Title><LocalHospitalIcon />{props.slotAvailability.vaccineCenterName}</Card.Title>
            <Card.Title className="mb-2 text-muted"><AddLocationIcon />{props.slotAvailability.location.address}, {props.slotAvailability.location.city}, {props.slotAvailability.location.state}, {props.slotAvailability.location.country}, {props.slotAvailability.location.pinCode}</Card.Title>
            <Card.Subtitle className="mb-2"> <VaccineInfo info={props.slotAvailability} /></Card.Subtitle>
            <Card.Title className="mb-2 text-muted"><AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />User Name : {props.slotAvailability.user.userName}</Card.Title>
            <Card.Title className="mb-2 text-muted"><ContactPageOutlinedIcon />User Id : {props.slotAvailability.user.id}</Card.Title>
            <h4><Card.Title className="Timeslot"><AlarmOutlinedIcon sx={{ fontSize: 20 }} /> Select Time Slot</Card.Title></h4>
            <Card.Subtitle className="mb-2 pt-2"><SelectTimeSlot timeSlots={props.slotAvailability.timeSlots} /></Card.Subtitle>
            <Card.Title className="mb-2"><VaccinatorInfo /></Card.Title>
          </Card.Body>
        </Card>
      </div>
      <Confirmation></Confirmation>
    </div>
  );
}

const VaccineInfo = (props) => {

  return (
    <div className='row div-vaccine-info'>
      <div className='col-4'>
        Vaccine Name  <VaccinesIcon />: {props.info.vaccine.vaccineType}
      </div>
      <div className='col-4'>
        Date <DateRange sx={{ fontSize: 15 }} /> : {props.info.date}
      </div>
      <div className='col-4' id="selected-time-slot">
        Time <AccessTimeOutlinedIcon sx={{ fontSize: 15 }} /> : NA
      </div>
    </div>
  );
}

const SelectTimeSlot = (props) => {

  return (
    <div className='row' id="select-timeslot" >
      {
        props.timeSlots.length > 0 && props.timeSlots.map((t, key) => {
          return <div className='col-3 mb-3'>
            <button className='btn btn-time-slot' id={key} onClick={() => setTime({ t })}>{t.startTime} - {t.endTime}</button>
          </div>
        })
      }
    </div>
  );
}

function setTime(props) {
  var time = document.getElementById("selected-time-slot");
  time.innerHTML = `Time : ` + props.t.startTime + `-` + props.t.endTime;

  var vaccinator = document.getElementById("Vaccinator");
  vaccinator.innerHTML = "Vaccinator : " + props.t.vaccinatorName;

  var slot = {};
  slot.date = cardDatenew; 
  slot.slotId = props.t.slotId;
  slot.status = "BOOKED";
  slot.time = props.t.startTime + "-" + props.t.endTime;;
  slot.vaccinatorName = props.t.vaccinatorName;

  apt.slot = slot;
}


const VaccinatorInfo = () => {

  return (
    <div className='row'>
      <div className='col-3' id="Vaccinator">
        Vaccinator <VaccinesIcon />: NA
        {/* <Form.Select className="Vaccinator-appt" id="Vaccinator" onChange={(event) => setVaccinator(event)}>
          <option>Vaccinator</option>
          {
            vaccinator.length > 0 && vaccinator.map((e) => {
              return <option value={e.name}>{e.name}</option>;
            })
          }
        </Form.Select> */}
      </div>
    </div>
  );
}

// set vaccinator 
// function setVaccinator(event) {
//   apt.vaccinator = event.target.value;
// }

function Confirmation() {
  const [alert, setAlert] = React.useState({ show: false, message: '' });

  // API call on appointment confirm.
  function ConfirmAppointment() {

    if (apt == null || apt === "undefined" || apt.slot == null || apt.slot === "undefined") {
      console.log("chk");
      setAlert({
        show: true,
        message: "Please select slot time....",
      });
    } else {
      // fetch('http://localhost:8080/slot-booking-service/api/v1/slot',
      fetch('http://44.207.171.169:8080/slot-booking-service/api/v1/slot',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(apt)
        }).then((result) => {
          if (result.status === 202) {
            updateStatusAsBooked(result.slot.slotId)
            setAlert({
              show: true,
              message: "Thank you!!! Your appointment is confirmed",
            });
            apt = {};
            isAppointmentConfirmed = true;
            return Promise.resolve(result.json());
          } else {
            return Promise.reject("Sorry!!! Not confirmed.");
          }
        }).catch(error => {
          setAlert({
            show: true,
            message: error,
          });
        })
    }
  }

  function updateStatusAsBooked(slotId) {
    // let url = "http://localhost:8080/slot-booking-service/api/v1/slot/status/" + slotId + "?status=BOOKEED";
    let url = "http://44.207.171.169:8080/slot-booking-service/api/v1/slot/status/" + slotId + "?status=BOOKEED";
    return fetch(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: "PUT"
      }).then((result) => {
        if (result.status === 202) {
          return Promise.resolve("Your appointment booked successfully!!")
        } else {
          return Promise.reject("Unable to booked slot");
        }
      }).then(msg => {
        return msg;
      }).catch(error => {  })
  };

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='confirm text-end'>
          <button className='btn btn-confirm ${isAppointmentConfirmed ? btn-success : btn-primary}' disabled={isAppointmentConfirmed} onClick={() => ConfirmAppointment()}>{isAppointmentConfirmed ? 'Booked' : 'Confirm'}</button>
        </div>
      </div>
      <ToastContainer className="p-3" position='top-end'>
        <Toast show={alert.show} onClose={() => setAlert({ show: false, message: '' })} delay={2000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Confirm</strong>
            <small>0 mins ago</small>
          </Toast.Header>
          <Toast.Body className='confirmed'><CheckIcon sx={{ fontSize: 15 }} />{alert.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

function AppointmentConfirmation(props) {

cardDatenew = props.slotAvailability.date;
  var slotAvailability = props.slotAvailability;
  isAppointmentConfirmed = false; //used to manage confirm button class

  // create form object
  apt.userName = props.slotAvailability.user.userName;
  apt.userEmail = props.slotAvailability.user.userEmailId;
  apt.vaccinationCenterEmailId = props.slotAvailability.vaccinationCenterEmailId;
  apt.vaccinationCenterName = props.slotAvailability.vaccineCenterName;
  apt.location = props.slotAvailability.location;
  apt.vaccine = props.slotAvailability.vaccine.vaccineType;
  apt.date = props.slotAvailability.date;

  return (
    <div className="container fluid = md">
      <div className="Row">
        <VaccinatorCard slotAvailability={slotAvailability} />
      </div>
    </div>
  )
}

export default AppointmentConfirmation;