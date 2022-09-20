import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import { FileDownload, Home, Map, PermIdentity, PhoneAndroid } from "@mui/icons-material";
import Email from "@mui/icons-material/Email";
import '../../styles/vc-center/editprofile.css';
import Sidebar from './vc-side-nav-draw/Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import VaccinesIcon from '@mui/icons-material/Vaccines';

function EditProfile() {
    const [user, setUser] = useState({});
    const [address, setAddress] = useState({});
    const [renderFlag, setRenderFlag] = useState(false);

    const getUserDetailsById = (id) => {
        // var url = "http://localhost:8080/user-service/api/v1/vaccination-center/" + id;
        var url = "http://44.207.171.169:8080/user-service/api/v1/vaccination-center/" + id;
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
        getUserDetailsById(localStorage.getItem("centerEmail"));
        setRenderFlag(true);
    }

    const { register, getValues, handleSubmit, watch, formState: { isValid, touchedField, errors } } = useForm({
        mode: "onBlur"
    })

    const [input, setInput] = useState('')

    const changeHandleUserNmae = e => {
        setInput(e.target.value);
    }

    const changeHandle = e => {
        setInput(e.target.value)
    }

    return (

        <section>
            <Sidebar />
            <div className="container Profile-center mt-5">
                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-1">
                        <div className="row">
                            <div class="col-12 text-center">
                                <img className='rounded-circle z-depth-2 shadow' alt="100x100" style={{ 'height': '150px', 'width': '150px' }} src="https://cdn-icons-png.flaticon.com/512/4625/4625853.png" data-holder-rendered="true" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        {/* <form id='profilecenter'> */}
                        <div className="row mb-3">
                            <h3>Vaccination Center Information</h3>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="text" id="centername" defaultValue={user.vaccinationCenterName} onChange={changeHandle} {...register("centername", {
                                            required: "Please Enter Center Name!",
                                        })} placeholder='Center Name' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <Home />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.centername?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="text" id="centerId" defaultValue={user.centerId} disabled onChange={changeHandle} {...register("centerid", {
                                            required: "Please Enter Center Id",
                                        })} placeholder='Center Id' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <PermIdentity />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.centerid?.message}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="email" id="email" defaultValue={user.centerEmail} onChange={changeHandle} {...register("email", {
                                            required: "Please Enter Your Email!",
                                        })} placeholder='E-mail' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <Email />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.email?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="contact" id="contact" defaultValue={user.contact} onChange={changeHandle} {...register("contact", {
                                            required: "Please Enter Your Contact!",
                                        })} placeholder='Contact' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <PhoneAndroid />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.contact?.message}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <h3>Address Details</h3>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="text" id="address" defaultValue={address?.addrss} onChange={changeHandle} {...register("address", {
                                            required: "Please Enter HouseNo",
                                        })} placeholder='Address' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <HomeIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.address?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="text" id="city" defaultValue={address?.city} onChange={changeHandle} {...register("city", {
                                            required: "Please Enter Street",
                                        })} placeholder='City' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <Map />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.city?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="text" id="district" defaultValue={address?.district} onChange={changeHandle} {...register("district", {
                                            required: "Please Enter City",
                                        })} placeholder='District' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <Map />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.district?.message}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="text" id="state" defaultValue={address?.state} onChange={changeHandle} {...register("state", {
                                            required: "Please Enter District",
                                        })} placeholder='State' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <Map />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.state?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="country" id="country" defaultValue={address?.country} onChange={changeHandle} {...register("country", {
                                            required: "Please Enter Country",
                                        })} placeholder='Country' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <Map sx={{ fontSize: 20 }} />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.country?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <InputGroup>
                                        <input className="form-control" type="pincode" id="pincode" defaultValue={address?.pincode} onChange={changeHandle} {...register("pincode", {
                                            required: "Please Enter Pincode",
                                        })} placeholder='Pincode' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <Map sx={{ fontSize: 20 }} />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <span style={{ color: "red", height: "15px" }}>{errors.pincode?.message}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm-6 mt-3'>
                                {/* <label htmlFor="vaccinatorName" className="form-label">Vaccinator Name</label> */}

                                <select id="vaccinators" name="vaccinators" className="form-control form-select" aria-label="Default select example"  {...register("vaccinators"
                                )}>
                                    <option defaultValue>Select Vaccinator</option>
                                    <option value="Parul">Parul</option>
                                    <option value="Ramij">Ramij</option>
                                    <option value="Depeeka">Depeeka</option>
                                    <option value="Rohit">Rohit</option>
                                </select>
                            </div>
                        </div>
                        {/* <div className="row">
                            user.vaccinators.map((vaccinator, key) {
                                <div className="col-6">
                                    <InputGroup>
                                        <input className="form-control" type="text" value={vaccinator}{...register("vaccinators", {
                                            required: "Please Enter Vaccinator",
                                        })} placeholder='vaccinators' />
                                        <InputGroupAddon className="profile-center-icon" addonType="append">
                                            <VaccinesIcon sx={{ fontSize: 20 }} />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            })
                        </div> */}

                        <div className="row mt-3">
                            <div className="col-12 text-center ">
                                <Link to='/vcenter/profile'><button className="btn btn-primary btn-edit-profile" onClick={() => updateUserDetails(user)}>Save Changes</button></Link>
                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

function updateUserDetails(user) {

    var updatedUser = {};
    updatedUser.centerEmail = document.getElementById("email").value;
    updatedUser.centerId = document.getElementById("centerId").value;
    updatedUser.contact = document.getElementById("contact").value;
    updatedUser.vaccinationCenterName = document.getElementById("centername").value;
    // updatedUser.vaccinators = document.getElementById("vaccinators").value;

    var updatedAddress = {};
    updatedAddress.addrss = document.getElementById("address").value;
    updatedAddress.city = document.getElementById("city").value;
    updatedAddress.district = document.getElementById("district").value;
    updatedAddress.state = document.getElementById("state").value;
    updatedAddress.pincode = document.getElementById("pincode").value;
    updatedAddress.country = document.getElementById("country").value;
    var updatedVaccinator = [document.getElementById("vaccinators").value]
    //  updatedVaccinator.vaccinators = document.getElementById("vaccinators").value;
    updatedUser.vaccinators = updatedVaccinator
    updatedUser.address = updatedAddress;
    console.log(updatedUser)
    // var url = "http://localhost:8080/user-service/api/v1/vaccination-center/" + user.centerId;

    var url = "http://44.207.171.169:8080/user-service/api/v1/vaccination-center/" + user.centerId;

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
                localStorage.setItem("address", updatedAddress.addrss)
                localStorage.setItem("pincode", updatedAddress.pincode)
                localStorage.setItem("district", updatedAddress.district)
                localStorage.setItem("country", updatedAddress.country)
                localStorage.setItem("state", updatedAddress.state)
                localStorage.setItem("city", updatedAddress.city)

                updatedUser = {};
                updatedAddress = {};
                return Promise.resolve("Updated successfully...");
            } else {
                return Promise.reject("Unable to retrieve the user details...");
            }
        }).then(msg => { }).catch(error => { alert(error); })
}

export default EditProfile