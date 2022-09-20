import React from "react";
import { Link } from 'react-router-dom';
import bgImg from '../../assets/vaccination.jpeg';
import '../../styles/vc-center/register.css'
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";

import { useForm } from 'react-hook-form';

function VCRegistration() {
    let navigate = useNavigate();
    const [alert, setAlert] = React.useState({ show: false, message: '' });

    const [open, setOpen] = React.useState(false);

    const handleToClose = (event, reason) => {
        if ("clickaway" == reason) return;
        setOpen(false);
    };

    const { register, handleSubmit, formState: {  isValid,errors } } = useForm({
        mode:"onBlur"
    })

    const onSubmit = (user)=>{
        var addCenter={
            vaccinationCenterName:user.vaccinationCenterName,
            centerEmail:user.centerEmail,
            password:user.password,
            contact:user.contact
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...addCenter})
        };
        fetch('http://44.207.171.169:8080/user-service/api/v1/vaccination-center/addVaccineCenter', requestOptions)
            .then((result) => {
                if (result.status === 201) {
                    setOpen(true);
                    navigate ('/vclogin')
                    return Promise.resolve(result.json());
                } else {
                    return Promise.reject("Unable to register user");
                }
            })
    };


    return (
        <section>
            <div className="vaccinationRegister">
            <div className="register">
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
                <div className="col-1">
                <div className=" mb-2" style={{width:"20vw",textAlign:"start",marginRight:"15px"}}><Link className="" style={{fontWeight:"bold",fontSize:"20px"}} to="/"> spotYourVaccine</Link></div>
                <div className="" style={{width:"20vw",textAlign:"start"}}><h2 style={{marginBottom:"25px"}}>VC Register</h2></div>

                    <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register("vaccinationCenterName",{
                             required: "Please Enter Center Name!", 
                        })} placeholder='Center Name' />
                        <span style={{ color: "red",height:"15px" }}>{errors.vaccinationCenterName?.message}</span> 

                        <input type="email" {...register("centerEmail", {
                            required: "Please Enter Your Email!", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please Enter A Valid Email!"
                            }
                        })} placeholder='E-mail' />
                        <span style={{ color: "red",height:"15px" }}>{errors.centerEmail?.message}</span> 
{/* 
                        <input type="text" {...register("address", {
                            required: "Please Enter Your Address!", 
                            pattern: {
                                message: "Please Enter your Address"
                            }
                        })} placeholder='Address' />
                        <span style={{ color: "red",height:"15px" }}>{errors.address?.message}</span>  */}

                        <input type="password" {...register("password", {
                            required: "Please Enter Your Password", 
                            pattern: {
                                value: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
                                message: "Please Enter A Valid Email!"
                            }
                        })} placeholder='Password' />
                         <span style={{ color: "red",height:"15px" }}>{errors.password?.message}</span> 


                        <input type="number" {...register("contact",{
                             required: "Please Enter Your Phone Number", 
                             pattern: {
                                 value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                 message: "Please Enter A Valid Phone Number!"
                             }
                        })} placeholder='Phone Number' />
                        <span style={{ color: "red",height:"15px" }}>{errors.contact?.message}</span> 

                        {/* <input type="file" {...register("proof")} placeholder='Proof' /> */}
                        

                        {/* <input type="file" {...register("proof",{
                             required: "Please Select Your Document!", 
                        })} placeholder='Proof' />
                        <span style={{ color: "red",height:"15px" }}>{errors.proof?.message}</span>  */}


                        <button className='btn' disabled={!isValid}>Register</button>
                        <p style={{margin:"0em"}} className="forgot-password textPosition">
                            Already Reister? &nbsp;
                            <Link className="nav-link" to="/vclogin">Login here</Link>
                        </p>
                            {/* <i style={{color:"red"}} className="fab fa-google fa-lg"></i> */}
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

                </div>
                </div>
            </div>
        </section>
    )

}

export default VCRegistration