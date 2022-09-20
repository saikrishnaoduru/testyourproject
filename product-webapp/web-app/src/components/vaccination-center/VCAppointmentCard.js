import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../../styles/vc-center/vcappointments.css'

import "react-multi-carousel/lib/styles.css";

import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AddLocationIcon from '@mui/icons-material/Place';
import BadgeIcon from '@mui/icons-material/Badge';
import NumbersIcon from '@mui/icons-material/Numbers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import axios from 'axios';

 function AppointmentCard(props) {
   var cardData= props.data;

  function vaccinated(){
	var slotid = cardData.slot.slotId;

	// let url = "http://localhost:8080/slot-booking-service/api/v1/slot/status/"+slotid+"?status=EXPIRED";
  let url = "http://44.207.171.169:8080/slot-booking-service/api/v1/slot/status/"+slotid+"?status=EXPIRED";
	axios.put(url).then(res=>{
	})
  
  // var url2 = "http://localhost:8080/vaccination-center-service/api/v1/slots/update/"+slotid+"?status=EXPIRED"
  var url2 = "http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/update/"+slotid+"?status=EXPIRED"
  axios.put(url2).then(res2=>{
   
	})
  

  }

  function cancelSlot(){
	var slotemail = cardData.userEmailId;
	// let url = "http://localhost:8080/slot-booking-service/api/v1/slotdelete/"+slotemail;
  let url = "http://44.207.171.169:8080/slot-booking-service/api/v1/slotdelete/"+slotemail;

  console.log(cardData)
	axios.delete(url).then(res=>{
		console.log(res.data,"done");
	}); 

  var slotidc = cardData.slot.slotId;
  // var url2 = "http://localhost:8080/vaccination-center-service/api/v1/slots/"+slotidc;
  var url2 = "http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/"+slotidc;
  axios.delete(url2).then(res2=>{
    console.log(res2.data,"doneVCS");
	})
  }
  var houseno = props.data.address.houseNo;
  var street = props.data.address.street;
  var city = props.data.address.city;
  var carddate= (cardData.slot.date).split("T")[0];

  return (
    <div className={props.flag}>
      <div className="search-card card box-shadow  mt-4 mb-2" >
                        <div className="card-body">
                            <h5 className="card-text " style={{"fontSize":"33px"}}><BadgeIcon className='me-2'/>{cardData.userName}</h5>
                            <h5 className="card-text " style={{"fontSize":"30px"}}><NumbersIcon className='me-2'/>{cardData.id}</h5>
                            <p className="card-text " style={{"fontSize":"25px"}}><AddLocationIcon className='me-2'/>{houseno}, {street}, {city}</p>
                            <p className="card-text availbleslots" style={{"fontSize":"20px"}}><VaccinesIcon className='me-2'/>{cardData.vaccine}</p>
                            <p className="card-text availbleslots" style={{"fontSize":"20px"}}><CalendarMonthIcon className='me-2'/>{carddate}</p>
                            <p className="card-text availbleslots" style={{"fontSize":"20px"}}><AccessTimeFilledIcon className='me-2'/>{cardData.slot.time}</p>
                        </div>
                        {props.flag == "booked" ?
                        <div className="card-footer text-center">
                            <button className='btn btn-success m-2 p-2 me-4' onClick={()=>vaccinated()}>Vaccinated</button>
                            <button className='btn btn-danger m-2 p-2' onClick={()=>cancelSlot()}>Cancel Slot</button>
                        </div>
                        : " "}
            </div>
    </div>
  )
  }
  export default AppointmentCard;
