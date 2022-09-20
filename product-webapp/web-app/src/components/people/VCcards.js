import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../../styles/people/search.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import "react-multi-carousel/lib/styles.css";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AppsIcon from '@mui/icons-material/Apps';
import AppointmentConfirmation from './AppointmentConfirmation';
import { useState } from 'react';
import { Modal } from "react-bootstrap";

var slotAvailability;

function BasicRating() {
  var ratingVal = Math.floor((Math.random() * 5) + 1);

  return (
    <span className='mt-2' >
      <Typography component="legend" className='w-auto'>Hygiene & Sanitation  &nbsp; &nbsp; &nbsp;  </Typography>
      <Rating name="read-only" value={ratingVal} readOnly />
    </span>
  );
}


const Vaccine = (props) => {

  if (props.vc.toLowerCase() == "covaxin") {
    return (
      <button className="btn btn-outline-info m-2 rounded d-inline card-btn">Covaxin</button>);
  }
  else if (props.vc.toLowerCase() == "covishield") {
    return (
      <button className="btn btn-outline-info m-2 rounded d-inline card-btn">Covishield</button>);
  }

}
const Rate = (props) => {
  if (props.rt > 0) {
    return (
      <button className="btn btn-outline-danger m-2 rounded d-inline card-btn">Paid</button>
    );
  }
  else {
    return (
      <button className="btn btn-outline-success m-2 rounded d-inline card-btn">Free</button>
    );
  }
}


const VcCards = (props, datetopass) => {
  var houseno = props.ele.address.houseNo;
  var street = props.ele.address.street;
  var city = props.ele.address.city;
  var pincode = props.ele.address.pincode;

  // API to fetch available slot by email id used for appointment confirmation added by Deepika.
  const getSlotAvailability = (queryParameter) => {
    // let url = "http://localhost:8080/vaccination-center-service/api/v1/slots/available/" + queryParameter;
    let url = "http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/available/" + queryParameter;
    return fetch(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: "GET"
      }).then((result) => {
        if (result.status === 200) {
          return Promise.resolve(result.json());
        } else {
          return Promise.reject("Unable to retrieve the available slot details");
        }
      }).then(slot => {
        slotAvailability = slot;
        return slot;
      }).catch(error => {
        alert(error);
      })
  }

  // API to fetch user information by email id used for appointment confirmation  added by Deepika.
  const UserInformationByEmailId = (emailId) => {
    // let url = "http://localhost:8080/user-service/api/v1/user/user/" + emailId;
    let url = "http://44.207.171.169:8080/user-service/api/v1/user/user/" + emailId;
    return fetch(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: "GET"
      }).then((result) => {
        if (result.status === 200) {
          return Promise.resolve(result.json());
        } else {
          return Promise.reject("Unable to retrieve the user information");
        }
      }).then(usr => {
        return usr;
      }).catch(error => {
        alert(error);
      })
  }

  const [show, setAppointmentConfirmation] = useState(false);

  const handleOpen = event => {
    getSlotAvailability(event.target.getAttribute('data-id')).then(resp => {
      UserInformationByEmailId(localStorage.getItem("userEmailId")).then(response => {
        slotAvailability.user =  response;
        setAppointmentConfirmation(true)});
    });
  }

  // used to pass query parameter to get slot availability
  let queryString = props.ele.centerEmail + "?date=" + props.datetopass + "&vaccineType=" + props.ele.vaccine.vaccineType;

  return (
    <>
      <div className="search-card card box-shadow  mt-4 mb-2" data-id={queryString} onClick={handleOpen}>
        <div className="card-body" data-id={queryString}>
          <h5 className="card-text" style={{ "fontSize": "25px" }} data-id={queryString}><LocalHospitalIcon /> {props.ele.vaccinationCenterName}</h5>
          <p className="card-text " style={{ "fontSize": "22px" }} data-id={queryString}><AddLocationIcon /> {houseno}, {street}, {city}, {pincode}</p>
          <p className="card-text availbleslots" style={{ color: "green", "fontSize": "20px" }} data-id={queryString}><AppsIcon /> {props.ele.vaccine.availableSlots} Slots Available</p>
        </div>
        <div className='ms-3' data-id={queryString}><VaccinesIcon /><Vaccine vc={props.ele.vaccine.vaccineType} /><CurrencyRupeeIcon /><Rate rt={props.ele.vaccine.price} /></div>
        <div className="card-footer" data-id={queryString}>
          <BasicRating />
        </div>
      </div>

      {/* Added by deepika to open model on card click  */}
      <Modal size="xl" show={show} onHide={() => setAppointmentConfirmation(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className="appt-modal-header" closeButton>
          <Modal.Title id="appt-modal-sizes-title-lg">Appointment Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentConfirmation slotAvailability={slotAvailability} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default VcCards;