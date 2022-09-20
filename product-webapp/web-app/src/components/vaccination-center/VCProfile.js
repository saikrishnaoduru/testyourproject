import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../../styles/vc-center/vcprofile.css'
import EmailIcon from '@mui/icons-material/Email';
import { MdVerified } from "react-icons/md";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import SignpostIcon from '@mui/icons-material/Signpost';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import { Link } from 'react-router-dom';
import Sidebar from './vc-side-nav-draw/Sidebar';
const emailPass = localStorage.getItem("centerEmail");      

function VCProfile() {
    useEffect(()=>{
        getUserData();
    },[])
    const [userdata , setuserData] = useState([]);
    const getUserData = () => {
        let email = localStorage.getItem("centerEmail");
        // let url = "http://localhost:8080/user-service/api/v1/vaccination-center/"+email;
        let url = "http://44.207.171.169:8080/user-service/api/v1/vaccination-center/"+email;
        return fetch(url , {headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }}).then((result) => {
            if (result.status === 200 ) {
                return Promise.resolve(result.json());
            } else {
                return Promise.reject("Unable to retrieve the location");
            }
        }).then(data => {
            setuserData(data);
            console.log(data);
                return data  ;
        }).catch(error => {
            throw new Error(error);
        }) 
    }

  return (
      <>
      <Sidebar />
        { userdata.length != 0 ? <div className='vcprofile'>
        <div className='header-div border' style={{'height':'200px'}}></div>
         <div className='card w-75 m-auto mt-4 profile-name  box-shadow'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 w-25 ms-4">
                        <div className='p-3'> 
                            <img className='rounded-circle z-depth-2 shadow' alt="100x100" style={{'height':'150px' , 'width': '150px'}} src="https://cdn-icons-png.flaticon.com/512/4625/4625853.png" data-holder-rendered="true"/>
                        </div>
                    </div>
                    <div className="col-sm-4 ">
                        <div className='bottom-text'>
                            <h1 className="font-weight-bold title">{userdata.vaccinationCenterName} <MdVerified /></h1>
                            <h3 className="font-weight-bold mt-3">Center ID : <span>{userdata.centerId}</span></h3>
                        </div>
                    </div>
                    <div className="col-sm-4">
                    <div className='profile-buttons ms-5'>
                            <Link to='/vcenter/editprofile'><button className='btn btn-secondary m-4  button w-50'>Edit Profile</button></Link>
                        </div>
                    </div>
                 </div>
            </div>
        
        </div>
        <div className='card-section mt-5 '>
            <div className="row mt-5">
                <div className='col-md-4 '>
                        <div className='card box-shadow'>
                            <div className='card-header text-uppercase text-center p-4'>Contact Information</div>
                            <div className='card-body p-4'>
                                <p><EmailIcon /><span className='ms-2'>{userdata.centerEmail}</span></p>
                                <p><PhoneAndroidIcon /><span className='ms-2'>{userdata.contact}</span></p>
                            </div>
                        </div>
                </div>
                <div className='col-md-8'>
                    <div className='card  card-2 box-shadow'>
                            <div className='card-header text-uppercase text-center p-4' >Address Details</div>
                            <div className='card-body p-4'>
                                <div className='address'>
                                    <div className='me-5'><HomeIcon/><span className='ms-2'>{userdata.address.addrss}</span></div>
                                    <div className='ms-5 me-5'><SignpostIcon /><span className='ms-2'>{userdata.address.city}</span></div>
                                    <div className='ms-5 me-5'><LocationCityIcon/><span className='ms-2'>{userdata.address.state}</span></div>   
                                </div>                           
                            </div>
                    </div>
                    <div className='card card-2 box-shadow'>
                            <div className='card-header text-uppercase text-center p-4'>Vaccinators</div>
                            <div className='card-body p-4'>
                            <p>
                                    {userdata.vaccinators.map((e)=>{    
                                       return <span className='ms-2 me-4'><AssignmentIndIcon className='ms-2'/> {e}</span>;
                                   })}
                            </p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>: ""}
        
      </> 
   
  )
}
export default VCProfile;