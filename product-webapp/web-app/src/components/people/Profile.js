import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../../styles/people/profile.css'
import EmailIcon from '@mui/icons-material/Email';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import SignpostIcon from '@mui/icons-material/Signpost';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Stepper from 'react-stepper-horizontal/lib/Stepper';
import { Link } from 'react-router-dom';
import Sidebar from '../side-nav-drawer/Sidebar'
import axios from 'axios';
function Profile() {
    const [userdata , setuserData] = useState([]);
    const [renderFlag , setRenderFlag] = useState(false);
    const [dateFlag , setDateFlag] = useState(false);
    var emailPass = localStorage.getItem("userEmailId");
    const getUserData = () => {
        var emailId = localStorage.getItem("userEmailId");
        // let url = "http://localhost:8080/user-service/api/v1/user/user/" + emailPass ;
        let url = "http://44.207.171.169:8080/user-service/api/v1/user/user/" + emailPass ;
        return fetch(url, {headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }}).then((result) => {
            if (result.status === 200 ) {
                return Promise.resolve(result.json());
            } else {
                return Promise.reject("Unable to retrieve the location");
            }
        }).then(data => {
            var udata = data;
            udata["nextdosedate"] = "No updates available";
            fetchBookedSlot(udata)
            setuserData(udata);
                return data  ;
        }).catch(error => {
            throw new Error(error);
        })
    }
    if(renderFlag == false){
        getUserData();
        setRenderFlag(true);
    }
    function fetchBookedSlot(data) {
        // let url = "http://localhost:8080/slot-booking-service/api/v1/getByUserEmail/" + emailPass;
        let url = "http://44.207.171.169:8080/slot-booking-service/api/v1/getByUserEmail/" + emailPass;
        axios.get(url).then(res=>{
          var vdata = res.data;
          if(vdata.slot.status == "BOOKED"){
            var d = (vdata.slot.date).split("T")[0];
            data.nextdosedate = d;
            setDateFlag(true)
                setuserData(data);
              }
        });
      }
  return (
      <>
        <Sidebar />
      { userdata.length != 0 ?
        <div className='profile'>
        <div className='header-div border' style={{'height':'200px'}}></div>
         <div className='card w-75 m-auto mt-4 profile-name  box-shadow'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 w-25 ms-4">
                        <div className='p-3'>
                            <img className='rounded-circle z-depth-2 shadow' alt="100x100" style={{'height':'150px' , 'width': '150px'}} src="https://cdn2.iconfinder.com/data/icons/covid-19-2/64/12-Mask-512.png" data-holder-rendered="true"/>
                        </div>
                    </div>
                    <div className="col-sm-4 ">
                        <div className='bottom-text'>
                            <h1 className="font-weight-bold ">{userdata.userName}</h1>
                            <h3 className="font-weight-bold mt-3">UserID : {userdata.id}<span></span></h3>
                        </div>
                    </div>
                    <div className="col-sm-4">
                    <div className='profile-buttons  ms-5'>
                    <Link to='/people/edit-profile'><button className='btn btn-secondary m-4  button mt-5'>Edit Profile</button></Link>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
        <div className='card-section mt-5 '>
            <div className="row mt-5">
                <div className='col-md-4 '>
                        <div className='card box-shadow'>
                            <div className='card-header text-uppercase text-center p-3'>Personal Information</div>
                            <div className='card-body p-4'>
                                <p className='my-4'><EmailIcon /><span className='ms-2'>{userdata.userEmailId}</span></p>
                                <p className='my-4'>{userdata.gender.toLowerCase() == "male" ? <MaleIcon/> : <FemaleIcon />}<span className='ms-2'>{userdata.gender}</span></p>
                                <p className='my-4'><CakeIcon/><span className='ms-2'>{userdata.dateOfBirth}</span></p>
                                <p className='my-4'><CalendarMonthIcon /><span className='ms-2'>{userdata.age} Yrs</span></p>
                                <p className='my-4'><PhoneAndroidIcon /><span className='ms-2'>{userdata.contactNumber}</span></p>
                            </div>
                        </div>
                </div>
                <div className='col-md-8'>
                    <div className='stepper '>
                        <Stepper steps={ [{title: 'First Dose'}, {title: 'Second Dose'}, {title: 'Booster Dose'}] } activeStep={(userdata.userVaccinationInfo != null && userdata.userVaccinationInfo.length != 0) ? (userdata.userVaccinationInfo[0].dose -1) : 0} />
                    </div>
                    <div className='card  card-2 box-shadow'>
                            <div className='card-header text-uppercase text-center p-3' >Address Details</div>
                            <div className='card-body p-4'>
                                <div className='address'>
                                    <div className='me-5'><HomeIcon/><span className='ms-2'>{userdata.address.houseNo}</span></div>
                                    <div className='ms-5 me-5'><SignpostIcon /><span className='ms-2'>{userdata.address.street}</span></div>
                                    <div className='ms-5 me-5'><LocationCityIcon/><span className='ms-2'>{userdata.address.city}</span></div>
                                </div>
                            </div>
                    </div>
                    <div className='card card-2 box-shadow'>
                            <div className='card-header text-uppercase text-center p-3'>Notices</div>
                            <div className='card-body p-4'>
                            {dateFlag == false ? <p><NotificationsActiveIcon/><span className='ms-2'>No Updates Available...</span></p> :
                                <p><NotificationsActiveIcon/><span className='ms-2'>Your next dose is booked on : {userdata.nextdosedate}</span></p>    }
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div> : " " }
      </>
  )
}
export default Profile;