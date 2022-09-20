import React from "react";
import { Link } from 'react-router-dom';
import bgImg from '../../assets/vac.jpg';
import { Toast, ToastContainer } from 'react-bootstrap';
import '../../styles/people/registration.css'
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";

import { useForm } from 'react-hook-form';

function Registration() {
    let navigate = useNavigate();
    const [alert, setAlert] = React.useState({ show: false, message: '' });

    const [open, setOpen] = React.useState(false);

    const handleToClose = (event, reason) => {
        if ("clickaway" == reason) return;
        setOpen(false);
    };

    const { register, getValues, handleSubmit, formState: { isValid, touchedField, errors } } = useForm({
        mode: "onBlur"
    })
    const onSubmit = user => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user })
        };
     //   fetch('http://44.207.171.169:8080/user-service/api/v1/user/addUser', requestOptions)
        fetch('http://44.207.171.169:8080/user-service/api/v1/user/addUser', requestOptions)
            .then((result) => {
                if (result.status === 201) {
                    setOpen(true);
                    // setAlert({
                    //     show: true,
                    //     message: "User Register Successfully",
                    //   });
                    navigate ('/login')
                    return Promise.resolve(result.json());
                } else {
                    return Promise.reject("Unable to register user");
                }
            })


    }

    return (
        <section>
            <div className="peopleRegistration">
                <div className="register">
                    <div className="col-2">
                        <img src={bgImg} alt="" />
                    </div>
                    <div className="col-1">
                    <div className=" mb-2" style={{width:"20vw",textAlign:"start",marginRight:"15px"}}><Link className="" style={{fontWeight:"bold",fontSize:"20px"}} to="/"> spotYourVaccine</Link></div>
                        <div className="" style={{ width: "20vw", textAlign: "start" }}><h2 style={{ marginBottom: "25px" }}>People Register</h2></div>

                        <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register("userName", {
                                required: "Please Enter Your Name!",
                            })} placeholder='Name' />
                            <span style={{ color: "red", height: "15px" }}>{errors.userName?.message}</span>

                            <input type="email" {...register("userEmailId", {
                                required: "Please Enter Your Email!",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please Enter A Valid Email!"
                                }
                            })} placeholder='E-mail' />
                            <span style={{ color: "red", height: "15px" }}>{errors.userEmailId?.message}</span>

                            <input type="password" {...register("password", {
                                required: "Please Enter Your Password",
                                pattern: {
                                    value: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
                                    message: "Please Enter your Password"
                                }
                            })} placeholder='Password' />
                            <span style={{ color: "red", height: "15px" }}>{errors.password?.message}</span>

                            {/* <input type="password" {...register("confirmpwd",{
                             validate: (match) => {
                             const password = getValues("password")
                             return match === password || "Passwords should match!"
                            }
                        })} placeholder='Confirm password' />
                        <span style={{ color: "red",height:"15px" }}>{errors.confirmpwd?.message}</span>  */}

                            <button className='btn' disabled={!isValid}>Register</button>
                            <p style={{ margin: "0em" }} className="forgot-password textPosition">
                                Already Reister? &nbsp;
                                <Link className="nav-link" to="/login">Login here</Link>
                            </p>

                        </form>

                        <Snackbar
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "top",
                            }}
                            open={open}
                            style={{ backgroundColor: "green" }}
                            autoHideDuration={6000}
                            message="Register Successfully"
                            onClose={handleToClose}
                            action={
                                <React.Fragment>
                                    <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={handleToClose}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                            }
                        />
                        {/* <ToastContainer className="p-3" position='top-end'>
                            <Toast show={alert.show} onClose={() => setAlert({ show: false, message: '' })} delay={2000} autohide>
                                <Toast.Header>
                                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                    <strong className="me-auto">Confirm</strong>
                                    <small>0 mins ago</small>
                                </Toast.Header>
                                <Toast.Body className='confirmed'><CheckIcon sx={{ fontSize: 15 }} />{alert.message}</Toast.Body>
                            </Toast>
                        </ToastContainer> */}

                    </div>
                </div>
            </div>
        </section>
    )

}

export default Registration
