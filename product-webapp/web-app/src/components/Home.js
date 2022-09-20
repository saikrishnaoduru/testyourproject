import React, { useEffect } from 'react'
import Navigation from './side-nav-drawer/HomeNavbar';
import '../styles/home.css'
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import TaskIcon from '@mui/icons-material/Task';
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


const Banner = () =>{
  return(
    <>
      <div className='card-section container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-6'>
              <div className='card ppl-outer '>
                <div className='card ppl-inner '>
                  <div className='row'>
                    <div className='col-md-3'>
                      <img src='https://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/people-icon.png' height="250px"/>
                    </div>
                    <div className='col-md-9 people'>
                    <p className='title-txt text-center mt-3 mb-3'>People</p>
                    <p className='text-center'><Link to="/login"><button className='login-txt button-49'>Login</button></Link></p>
                    <p className='text-center'><Link to="/register"><button className='reg-txt button-49' >Register</button></Link></p>
                    </div>
                   
                  </div>
                </div>         
              </div>
          </div>
          <div className='col-md-6'>
              <div className='card vc-outer'>
                <div className='card vc-inner '>
                <div className='row'>
                    <div className='col-md-3'>
                      <img src='https://cdn-icons-png.flaticon.com/512/4625/4625853.png' height="250px"/>
                    </div>
                    <div className='col-md-9 vcenter mt-3'>
                    <p className='title-txt text-center mb-3'>Vaccination Center</p>
                    <p className='text-center'><Link to="/vclogin"><button className='login-txt button-49'>Login</button></Link></p>
                    <p className='text-center'><Link to="/vcregister"><button className='reg-txt button-49' >Register</button></Link></p>
                    </div>
                  </div>
                </div>            
              </div>
            
          </div>
        </div>

      </div>
    </>
  );

}

const Guidelines = () =>{
  useEffect(() => {
    getStateName();
  }, []);

const getStateName = () => {
  return fetch("../../states-districts.json" , {headers:{
   'Content-Type': 'application/json',
   'Accept': 'application/json'
  }}).then((result) => {
      if (result.status === 200 ) {
          return Promise.resolve(result.json());
      } else {
          return Promise.reject("Unable to retrieve the location");
      }
  }).then(stateDistrictLocation => {
           var states = stateDistrictLocation.states;
          createStateList(states);
          return states  ;
 }).catch(error => {
       throw new Error(error);
  }) 
}

const createStateList = (props) => {
   var stateArray = props;
   var list = document.getElementById("stateslist");
   let options = `<option value ="0" >Select State</option>` ,i =0 ;
   stateArray.forEach(element => {
       i = i+1;
       options = options+`
       <option value ="${i}">${element.state}</option>`;
   });
   list.innerHTML= options;

}

const getDistrictName = () => {
   var stateId = document.getElementById("stateslist").value;
   
   if(stateId > 0)
   {
       var disabledopt = document.getElementById("districtlist");
       disabledopt.disabled= false;

       return fetch("../../states-districts.json" , {headers:{
           'Content-Type': 'application/json',
           'Accept': 'application/json'
          }}).then((result) => {
              if (result.status === 200 ) {
                  return Promise.resolve(result.json());
              } else {
                  return Promise.reject("Unable to retrieve the location");
              }
          }).then(stateDistrictLocation => {
                   var districtNames = stateDistrictLocation.states[stateId-1].districts;
                     
                  createDistrictList(districtNames);
                  
                  return districtNames   ;
         }).catch(error => {
               throw new Error(error);
          }) 
   }

}
const createDistrictList = (props) => {
   var districtArray = props;
   var distlist = document.getElementById("districtlist");
   let  distoptions = `<option value ="" >Select District</option>` ,i =0;
   districtArray.forEach(element => {
       i = i+1;
       distoptions =  distoptions+`
       <option value ="${i}">${element}</option>`;
   });
   distlist.innerHTML=  distoptions;

}
  return (
    <div className='guidelines bg-light mt-2 mb-2' id='guidelines'>
          <h2 style={{color:'#93238C'}} className='text-center mb-4 mt-3 section-title'>Get vaccinated in 3 easy steps</h2>
          <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='card outer mb-4'>
                <div className='card-body'>
                    <h3 className='steptitle text-center'>Step 1</h3>
                    <div className='card inner'>
                        <BookOnlineIcon className='cardlogo'/>
                        <h2 className='p-3 text-center'>Book an Appointment on SpotYourVaccine</h2>
                    </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card outer mb-4' >
                <div className='card-body'>
                <h3 className='steptitle text-center'>Step 2</h3>
                <div className='card inner'>
                      <VaccinesIcon className='cardlogo'/>
                      <h2 className='p-3 text-center' >Get Your Vaccination Safely at the Time of Your Appointment</h2>
                </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card outer mb-4'>
                <div className='card-body'>
                <h3 className='steptitle text-center'>Step 3</h3>
                <div className='card inner'>
                        <TaskIcon className="cardlogo"/>
                        <h2 className='p-3 text-center'>Download Your Vaccination Certificate and wait for #Next Dose </h2>
                </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className='container'>
                    <h1 className='mt-2 text-center ' style={{color:'#93238C'}} >Find Your Nearest Vaccination Center</h1>
                    <div className='p-2'>
                <div className="nav nav-tabs mt-3" id="nav-tab" role="tablist">
                    <button className="nav-link active w-50 box-shadow no-box-border"  id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" style={{"fontSize":"25px"}}>By District</button>
                    <button className="nav-link w-50 box-shadow no-box-border" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" style={{"fontSize":"25px"}}>By PIN</button>
                    
                </div>
                
                    <div className="tab-content mt-2" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <form>
                                <div className='row'>
                                    <div className='col-sm-4 mt-2' >
                                            <select className="form-select form-select" aria-label="Default select example" id='stateslist' onClick={() => getDistrictName()}>
                                            <option disabled>Select State</option>
                                            </select>
                                    </div>
                                    <div className='col-sm-4 mt-2 ' >
                                        <select className="form-select form-select " aria-label="Default select example" id='districtlist' disabled={true}>
                                            <option >Select District</option>
                                        </select>
                                    </div>
                                    <div className='col-sm-4 mt-2'>
                                    <Link to="/login"><button type="button" className="btn btn-primary w-100 Searchbtn " >Search</button></Link>
                                    </div>
                               
                                </div>
                            </form>    
                                               
                        </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <div className='row'>
                                    <div className='col-md-6 mt-2 d-flex justify-content-center'>
                                    <input type="text" pattern="^[0-9]{6}$" maxLength={6} className="form-control w-50 m-auto" placeholder='Enter PINCODE' id='pincode'/>
                                    </div>
                                    <div className='col-md-6 mt-2 d-flex justify-content-center'>
                                        <Link to="/login"><button type="button" className="btn btn-primary guide Searchbtn">Search</button></Link>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>    

          </div>
      </div>
  );
}


const Features =() =>{
  return(
    <div id='features' className='container-fluid'>
    <div className=''>
    <h2 className='text-center section-title' style={{color:'#93238C'}} >Features</h2>
      <div className='row'>
          <div className='col-md-6' >
              <div className='ppl-card'>
                <h2 className='text-center feature-subtitle'>People</h2>



                <ul className="tilesWrap">
                    <li>
                      <h2>01</h2>
                      <h3>Search Vaccination Center By District and Pincode</h3>
                      </li>
                    <li>
                      <h2>02</h2>
                      <h3>Find vaccine of your choice based on the date and vaccine type</h3>
                      
                    </li>
                    <li>
                      <h2>03</h2>
                      <h3>Book your slot</h3>
                      
                    </li>
                    <li>
                      <h2>04</h2>
                      <h3>View the Vaccination status</h3>
                      
                    </li>
                    <li>
                      <h2>05</h2>
                      <h3>Download Certificate</h3>
                      
                    </li>
                </ul>

              </div>
          </div>
          <div className='col-md-6' >
              <div className=' vcc-card'>
                <h2 className='text-center feature-subtitle'>Vaccination Center</h2>
                <ul className="tilesWrap">
                    <li>
                      <h2>01</h2>
                      <h3>Add Vaccination slots</h3>
                      
                      </li>
                    <li>
                      <h2>02</h2>
                      <h3>Track and Manage Vaccination slots</h3>
                      
                      
                    </li>
                    <li>
                      <h2>03</h2>
                      <h3>Update and Cancel Booked slots</h3>
                      
                    </li>
                    <li>
                      <h2>04</h2>
                      <h3>Show Vaccination Statistics</h3>
                      
                    </li>
                    <li>
                      <h2>05</h2>
                      <h3>Nofity User for Booked slot by Email</h3>
                      
                    </li>
                </ul>

              </div>
          </div>
      </div>
      </div>
    </div>
  );
}




const Footer =() =>{
  return(
    <div id='footer ' className=' bg-light '>
      <div className='row mt-3'>
        <div className='col-md-4 text-center mt-2'>
            <GoogleIcon className='footerlogo me-2'/>SpotYourVaccine@gmail .com
        </div>
        <div className='col-md-4 text-center mt-2'>
            <InstagramIcon className='footerlogo me-2'/>@SpotYourVaccine
        </div>
        <div className='col-md-4 text-center mt-2'>
            <WhatsAppIcon className='footerlogo me-2'/>@SpotYourVaccine - +91 - 9876543210
        </div>
      </div>
    </div>
  );
}


function Home() {
  return (
    <div className='home'>
      <Navigation/>
      <Banner />
      <Guidelines />
      <Features />
      <Footer />
    </div>
  )
}
export default Home;