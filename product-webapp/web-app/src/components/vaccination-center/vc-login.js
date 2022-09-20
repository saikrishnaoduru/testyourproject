import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import bgImg from '../../assets/vaccination.jpeg';
import '../../styles/vc-center/vcloigin.css'
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";

import { useForm } from 'react-hook-form';

function VCLogin() {
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleToClose = (event, reason) => {
        if ("clickaway" == reason) return;
        setOpen(false);
    };

    const { register, handleSubmit, formState: {  isValid,errors } } = useForm({
        mode:"onBlur"
    })
    const onSubmit = user => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...user})
        };
        fetch('http://44.207.171.169:8080/authentication-service/api/v1/login', requestOptions)
            .then((result) => {
                    if (result.status === 200) {
                        const requestOptions1 = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                            
                        };
                        console.log(user.userEmail)
                        fetch('http://44.207.171.169:8080/user-service/api/v1/vaccination-center/specific/'+user.userEmail, requestOptions1).then((res)=>{
                            if(res.status==200){
                                return Promise.resolve(res.json());
                            }else {
                                return Promise.reject("Unable to retrieve the center details");
                            }
                        }).then(centerData => {
              
                            localStorage.setItem("centerName",centerData[0].vaccinationCenterName)
                            localStorage.setItem("centerEmail",centerData[0].centerEmail)
                            localStorage.setItem("centerId",centerData[0].centerId)
                            // localStorage.setItem("city",centerData[0].address.city)
                            // localStorage.setItem("address",centerData[0].address.address)
                            // localStorage.setItem("pincode",centerData[0].address.pincode)
                            // localStorage.setItem("country",centerData[0].address.country)
                            // localStorage.setItem("state",centerData[0].address.state)
                            navigate ('/vcenter/slots-available')
                           
                        }).catch(error => { 
                            throw new Error(error);
                        })
                    setOpen(true);
                   
                    return Promise.resolve(result.json());
                } else {
                    return Promise.reject("Unable to register user");
                }
            })
    };

    return (
        <section>
            <div className="vaccinationLogin">
            <div className="register">
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
                <div className="col-1">
                <div className=" mb-2" style={{width:"20vw",textAlign:"start",marginRight:"15px"}}><Link className="" style={{fontWeight:"bold",fontSize:"20px"}} to="/"> spotYourVaccine</Link></div>
                <div className="" style={{width:"20vw",textAlign:"start"}}><h2 style={{marginBottom:"25px"}}>VC Login</h2></div>
                    <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" {...register("userEmail", {
                            required: "Please Enter Your Email!", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please Enter A Valid Email!"
                            }
                        })} placeholder='E-mail' />
                        <span style={{ color: "red",height:"15px" }}>{errors.userEmail?.message}</span> 

                        <input type="password" {...register("userPassword", {
                            required: "Please Enter Your Password", 
                            pattern: {
                                value: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
                                message: "Please Enter A Valid Email!"
                            }
                        })} placeholder='Password' />
                         <span style={{ color: "red",height:"15px" }}>{errors.userPassword?.message}</span> 

                        <button className='btn' disabled={!isValid}>Sign In</button>
                        <p style={{margin:"0em"}} className="forgot-password textPosition">
                            Not having account? &nbsp;
                            <Link className="nav-link" to="/vcregister">Sign up</Link>
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
                            message="User Login Successfully"
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

export default VCLogin