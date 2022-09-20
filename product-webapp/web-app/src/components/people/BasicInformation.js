import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { useForm } from 'react-hook-form';
import { useState } from "react";
import '../../styles/people/BasicInformation.css'
import Stepper from 'react-stepper-horizontal/lib/Stepper';

import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import { InputGroup } from "react-bootstrap";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { grey } from "@mui/material/colors";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Sidebar from '../side-nav-drawer/Sidebar'
import { VaccinesOutlined } from "@mui/icons-material";
import CallIcon from '@mui/icons-material/Call';
import { DateRange } from "@material-ui/icons";

var updatedUser = {};
var updatedAddress = {};
var updatedUserVaccinationInfo = {};
function BasicInformation() {

    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);
    const [renderFlag, setRenderFlag] = useState(false);

    const getUserDetailsById = (id) => {
        // var url = "http://localhost:8080/user-service/api/v1/user/user/" + id;
        var url = "http://44.207.171.169:8080/user-service/api/v1/user/user/" + id;
        return fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then((result) => {
                if (result.status === 200) {
                    return Promise.resolve(result.json());
                } else {
                    return Promise.reject("Unable to retrieve the user details");
                }
            }).then(usr => {
                setUser(usr);
                setAddress(usr.address);
                return user;
            }).catch(error => {
                alert(error);
            })
    }

    if (renderFlag == false) {
        getUserDetailsById(localStorage.getItem("userEmailId"));
        setRenderFlag(true);
    }

    const { register, handleSubmit, formState: { isValid, touchedField, errors } } = useForm({
        mode: "onBlur"
    })

    const [input, setInput] = useState('')

    const changeHandle = e => {
        setInput(e.target.value)
    }

    return (
        <section>
            <Sidebar />
            <div className="container mt-5 basic-information">
                <div className="row pt-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <img className='rounded-circle z-depth-2 shadow' alt="100x100" style={{ 'height': '150px', 'width': '150px' }} src="https://cdn2.iconfinder.com/data/icons/covid-19-2/64/12-Mask-512.png" data-holder-rendered="true" />
                    </div>
                </div>

                <div className="container">
                    {/* <form id='edit-profile' className='cl-edit-profile flex flex-col'> */}
                    <div className="row">
                        <h3>Basic Information</h3>
                    </div>
                    <div className="row mt-3" id="div-basic-information">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="userName" defaultValue={user.userName} onChange={changeHandle} {...register("userName", {
                                        required: "Please Enter Your Full Name",
                                    })} placeholder='Name' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <ContactPageOutlinedIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.userName?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="id" defaultValue={user.id} disabled onChange={changeHandle} {...register("id", {
                                        required: "Please Enter UserID",
                                    })} placeholder='UserId' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 30, fontcolor: grey }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.id?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="date" id="dateOfBirth" defaultValue={user?.dateOfBirth} onChange={changeHandle} {...register("dateOfBirth", {
                                        required: "Please Enter Date of Birth",
                                    })} placeholder='Date of Birth' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                    <DateRange sx={{ fontSize: 30 }}/>
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.dateOfBirth?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="contactNumber" defaultValue={user?.contactNumber} onChange={changeHandle} {...register("contactNumber", {
                                        required: "contactNumber",
                                    })} placeholder='Contact Number' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <CallIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="email" id="email" defaultValue={user.userEmailId} onChange={changeHandle} {...register("userEmailId", {
                                        required: "Please Enter Your Email",
                                    })} placeholder='E-mail' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <EmailIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.email?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="gender" defaultValue={user?.gender} onChange={changeHandle} {...register("gender", {
                                        required: "Gender",
                                    })} placeholder='Gender' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <WcOutlinedIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="age" defaultValue={user?.age} onChange={changeHandle} {...register("age", {
                                        required: "Please Enter Your Age",
                                    })} placeholder='Age' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <CalendarMonthIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.Age?.message}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <h3>Address Details</h3>
                    </div>
                    <div className="row mt-3" id="div-address">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="houseNo" defaultValue={address?.houseNo} onChange={changeHandle} {...register("houseNo", {
                                        required: "Please Enter HouseNo",
                                    })} placeholder='HouseNo' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <LocationCityIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.houseNo?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="city" defaultValue={address?.city} onChange={changeHandle} {...register("city", {
                                        required: "Please Enter City",
                                    })} placeholder='City' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <LocationCityIcon sx={{ fontSize: 30, fontcolor: grey }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.city?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="district" defaultValue={address?.district} onChange={changeHandle} {...register("district", {
                                        required: "Please Enter District",
                                    })} placeholder='District' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <LocationCityIcon sx={{ fontSize: 30, fontcolor: grey }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.district?.message}</span>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="street" defaultValue={address?.street} onChange={changeHandle} {...register("street", {
                                        required: "Please Enter street",
                                    })} placeholder='street' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <LocationCityIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.street?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="country" defaultValue={address?.country} onChange={changeHandle} {...register("country", {
                                        required: "Please Enter Country",
                                    })} placeholder='Country' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <LocationCityIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.country?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="pincode" defaultValue={address?.pincode} onChange={changeHandle} {...register("pincode", {
                                        required: "Please Enter Pincode",
                                    })} placeholder='Pincode' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <LocationCityIcon sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.pincode?.message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h3>VaccineInfo</h3>
                    </div>
                    <div className="row mt-3" id="div-address">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="dose" defaultValue={(user.userVaccinationInfo != null && user.userVaccinationInfo != 0) ? user.userVaccinationInfo[0].dose : ''} onChange={changeHandle} {...register("dose", {
                                        required: "Please Enter Dose Report",
                                    })} placeholder='Dose' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <VaccinesOutlined sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.pincode?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="vaccinationId" defaultValue={(user.userVaccinationInfo != null && user.userVaccinationInfo != 0) ? user.userVaccinationInfo[0].vaccinationId : ''} onChange={changeHandle} {...register("vaccinationId", {
                                        required: "Please Enter vaccinationId",
                                    })} placeholder='Vaccination Id' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <VaccinesOutlined sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.vaccinationId?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <select id="vaccineType" name="vaccineType" className="form-control form-select" aria-label="Default select example"  {...register("vaccineType"
                                )}>
                                    <option defaultValue>Select Vaccine</option>
                                    <option value="COVAXIN">COVAXIN</option>
                                    <option value="COVISHIELD">COVISHIELD</option>
                                </select>
                                <span style={{ color: "red", height: "15px" }}>{errors.vaccineType?.message}</span>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="center" defaultValue={(user.userVaccinationInfo != null && user.userVaccinationInfo != 0) ? user.userVaccinationInfo[0].center : ''} onChange={changeHandle} {...register("center", {
                                        required: "Please Enter center",
                                    })} placeholder='Center' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <VaccinesOutlined sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.centerAddress?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="text" id="centerAddress" defaultValue={(user.userVaccinationInfo != null && user.userVaccinationInfo != 0) ? user.userVaccinationInfo[0].centerAddress : ''} onChange={changeHandle} {...register("centerAddress", {
                                        required: "Please Enter centerAddress",
                                    })} placeholder='Center Address' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <VaccinesOutlined sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.pincode?.message}</span>
                            </div>
                            <div className="form-group mb-3">
                                <InputGroup>
                                    <input className="form-control" type="date" id="dateOfVaccination" defaultValue={(user.userVaccinationInfo != null && user.userVaccinationInfo != 0) ? user.userVaccinationInfo[0].dateOfVaccination : ''} onChange={changeHandle} {...register("dateOfVaccination", {
                                        required: "Please Enter Date of Vaccination",
                                    })} placeholder='Date Of Vaccination' />
                                    <InputGroupAddon className="basic-info-icon" addonType="append">
                                        <VaccinesOutlined sx={{ fontSize: 30 }} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <span style={{ color: "red", height: "15px" }}>{errors.dateOfVaccination?.message}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
                            <Link to='/people/profile'><button className="btn btn-primary button-div" onClick={() => SaveChanges(user)}>Save Changes</button></Link>
                        </div>
                    </div>

                    {/* </form> */}
                </div>
            </div>
        </section>
    )
}

function SaveChanges(user) {

    updatedUser.userEmailId = document.getElementById("email").value;
    updatedUser.id = document.getElementById("id").value;
    updatedUser.userName = document.getElementById("userName").value;
    updatedUser.dateOfBirth = document.getElementById("dateOfBirth").value;
    updatedUser.age = document.getElementById("age").value;
    updatedUser.gender = document.getElementById("gender").value;
    updatedUser.contactNumber = document.getElementById("contactNumber").value;

    updatedAddress.houseNo = document.getElementById("houseNo").value;
    updatedAddress.city = document.getElementById("city").value;
    updatedAddress.district = document.getElementById("district").value;
    updatedAddress.state = document.getElementById("street").value;
    updatedAddress.street = document.getElementById("street").value;
    updatedAddress.pincode = document.getElementById("pincode").value;
    updatedAddress.country = document.getElementById("country").value;

    updatedUser.address = updatedAddress;

    updatedUserVaccinationInfo.dose = document.getElementById("dose").value;
    updatedUserVaccinationInfo.vaccinationId = document.getElementById("vaccinationId").value;
    updatedUserVaccinationInfo.vaccineType = document.getElementById("vaccineType").value;
    updatedUserVaccinationInfo.center = document.getElementById("center").value;
    updatedUserVaccinationInfo.centerAddress = document.getElementById("centerAddress").value;
    updatedUserVaccinationInfo.dateOfVaccination = document.getElementById("dateOfVaccination").value;

    updatedUser.userVaccinationInfo = [updatedUserVaccinationInfo];
    updatedUser.password = user.password

    // var url = "http://localhost:8080/user-service/api/v1/user/user/" + user.id;
    var url = "http://44.207.171.169:8080/user-service/api/v1/user/user/" + user.id;

    return fetch(url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(updatedUser)
        }).then((result) => {
            if (result.status === 200) {
                updatedUser = {};
                updatedAddress = {};
                updatedUserVaccinationInfo = {};
                return Promise.resolve("Updated successfully...");
            } else {
                return Promise.reject("Unable to retrieve the user details...");
            }
        }).then(msg => { }).catch(error => { alert(error); })
}

export default BasicInformation