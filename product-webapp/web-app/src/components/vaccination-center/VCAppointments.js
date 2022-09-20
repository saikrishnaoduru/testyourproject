import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../../styles/vc-center/vcappointments.css'
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import AppointmentCard from './VCAppointmentCard';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './vc-side-nav-draw/Sidebar';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
function Appointments() {

    const [displayFlag ,setDisplayFlag] = useState(false);
    const [bookedslots ,setBookedslots] = useState([]);
    const [doneslots ,setDoneslots] = useState([]);
    const [RFlag , setRFlag] = useState(true)
    const [filterbook , setFilterBook] = useState([]);
    const [resetBtn , setResetBtn] = useState(true);
    const [filterdone , setFilterDone] = useState([]);
    const [resetBtnDone , setResetBtnDone] = useState(true);

/*   useEffect(e=>{
    getBookedSlots();
  },[]) */

    var Arrlength ;
    var detailsArr = [];
    var doneArr = [];
    var done;
    var ck = 0;

//Get Booked Slots
    const getBookedSlots = () => {
        setDisplayFlag(true);
        let email = localStorage.getItem("centerEmail")
        // let url = 'http://localhost:8080/slot-booking-service/api/v1/getByVaccinationEmail/' + email;
        let url = 'http://44.207.171.169:8080/slot-booking-service/api/v1/getByVaccinationEmail/' + email;
        axios.get(url).then(res=>{
          
          if(ck == 0){
            getUserDetails(res.data);
            ck++;
          }
        })
}
function getUserDetails(infoArr){
    var countArr = infoArr.filter(x =>(x.slot.status == "BOOKED"));
    Arrlength = countArr.length;
    infoArr.map(e =>{
        var temp;
        if(e.slot.status == "BOOKED"){
        // let userurl = 'http://localhost:8080/user-service/api/v1/user/user/' + e.userEmail;
        let userurl = 'http://44.207.171.169:8080/user-service/api/v1/user/user/' + e.userEmail;
            axios.get(userurl).then(res=>{
                temp = res.data;
                temp["idd"] = e.id;
                temp["vaccine"] = e.vaccine;
                temp["slot"] = e.slot;
                detailsArr.push(temp);
                console.log(detailsArr);
                if(detailsArr.length == Arrlength){
                  setBookedslots(detailsArr);
                }
                
            })
          }
          });
}

/* 
function showCards(){
  if(count==Arrlength){
    setBookedslots(detailsArr);
        console.log(bookedslots,"Arr");
        setDisplayFlag(true);
  }
}
 */

//Get Done Slots
const getDoneSlots = () => {
  setDisplayFlag(true);
  let email = localStorage.getItem("centerEmail");
  // let url = 'http://localhost:8080/slot-booking-service/api/v1/getByVaccinationEmail/' + email;
  let url = 'http://44.207.171.169:8080/slot-booking-service/api/v1/getByVaccinationEmail/' + email;
  axios.get(url).then(res=>{
      getUserDoneDetails(res.data);
  })
}

function getUserDoneDetails(infoDoneArr){
  var Donelength =  infoDoneArr.length;
  infoDoneArr.map(e =>{
      if(e.slot.status.toLowerCase() == "expired"){
          // let userurl2 = 'http://localhost:8080/user-service/api/v1/user/user/' + e.userEmail;
          let userurl2 = 'http://44.207.171.169:8080/user-service/api/v1/user/user/' + e.userEmail;
              axios.get(userurl2).then(res=>{
                  done = res.data;
                  done["vaccine"] = e.vaccine;
                  done["slot"] = e.slot;
                  doneArr.push(done);               
                    setDoneslots(doneArr);
                 
                })
        }
      });     
}


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

 function  renderFunction() {
  setRFlag(false);
     getBookedSlots();
    
    }

    var cards;
    var idb=0 , idd =0 , idc = 0;
    var sortedArr = [];
///Set Date and Date Filters
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;

    const dateFilterBooked = () => {
        
        var newdate = document.getElementById("bookeddate").value;
        const resultArr = bookedslots;
        sortedArr =  resultArr.filter(el => (
          el.slot.date.split("T")[0] == newdate
          ));
        console.log(sortedArr , "Chk");
        document.getElementById("bookedDiv").style.display = 'none' ;
        document.getElementById("resultDiv").style.display = 'block' ;
        setFilterBook(sortedArr);
        setResetBtn(false);
  }
  function ResetBook() {
    document.getElementById("bookedDiv").style.display = 'block' ;
    document.getElementById("resultDiv").style.display = 'none' ;
    setFilterBook([]);
    document.getElementById('searchboxbook').value = "";
  }
  const searchBook = () =>{
    setFilterBook([]);
    var UID = document.getElementById("searchboxbook").value;
    const resultArr = bookedslots;
    sortedArr =  resultArr.filter(el => (el.userId == UID));
    console.log(sortedArr);
    document.getElementById("bookedDiv").style.display = 'none' ;
    setFilterBook(sortedArr);


}
  


  const dateFilterDone = () => {
    var newdate = document.getElementById("donedate").value;
    const resultArr = doneslots;
        console.log(newdate , "in Done filter");
        var  y = 0;
        sortedArr =  resultArr.filter(el => (el.slot.date.split("T")[0] == newdate));
        console.log(sortedArr , "done dt");
        document.getElementById("doneDiv").style.display = 'none' ;
        /* document.getElementById("doneresultDiv").style.display = 'block' ; */
        setFilterDone(sortedArr);
        setResetBtnDone(false)
  }
  function ResetDone() {
    document.getElementById("doneDiv").style.display = 'block' ;
    document.getElementById("doneresultDiv").style.display = 'none' ;
    setFilterDone([]);
    document.getElementById('searchboxdone').value = "";
  }

  const searchDone = () =>{
    setFilterDone([]);
    var UID = document.getElementById("searchboxdone").value;
    const resultArr = doneslots;
    sortedArr =  resultArr.filter(el => (el.userId == UID));
    console.log(sortedArr);
    document.getElementById("doneDiv").style.display = 'none' ;
    setFilterDone(sortedArr);
}
const resetSearch = (e) =>{
    console.log(e.target.value, "val");
    if(e.target.value == ''){
       setFilterDone(bookedslots);
      
    }
}



//Main retun
  return (
      <>
        <Sidebar />
     {RFlag == true ? renderFunction() : " "}
      {displayFlag == true ? 
    <div className='appointments'>
            <div className='header container'>
                    <h1 className='mt-3 text-center '>Slots Dashboard</h1>
            </div>
            <div className='p-2'>
                <div className="nav nav-tabs mt-0" id="nav-tab" role="tablist">
                    <button className="nav-link  active box-shadow no-box-border"  id="nav-booked-tab" data-bs-toggle="tab" data-bs-target="#nav-booked" type="button" role="tab" aria-controls="nav-booked" aria-selected="true" style={{"fontSize":"25px" , "width":"50%"}} onClick={()=>getBookedSlots()}>Booked Slots</button>
                    <button className="nav-link  box-shadow no-box-border" id="nav-done-tab" data-bs-toggle="tab" data-bs-target="#nav-done" type="button" role="tab" aria-controls="nav-done" aria-selected="false" style={{"fontSize":"25px", "width":"50%"}} onClick={()=>getDoneSlots()}>Vaccinated/Completed Slots</button>
                </div>
                <div className="tab-content mt-2" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-booked" role="tabpanel" aria-labelledby="nav-booked-tab">
                            <div className='datesearch p-3 m-3'>
                                    <div className='date'>
                                        <span className='result-subtext2 me-3'> <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 0 24 24" width="45"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg> </span>
                                        <input type="date" className="form-control w-auto d-inline" id="bookeddate" min={today}  onSelect={ ()=>dateFilterBooked()} /> <button className='btn btn-danger ms-2 ' id='reset' disabled={resetBtn} onClick={()=>ResetBook()}>Reset Filter</button>
                                    </div>
                                    <div className='search'>
                                   <input type="search" className="form-control w-auto d-inline" id="searchboxbook" placeholder='Search Slot by User ID' onChange={(e)=>resetSearch(e)}/><button className='btn btn-info search' onClick={()=>searchBook()}><SearchIcon className='mt-0'/></button><button className='btn btn-info' onClick={()=>ResetBook()}><ClearIcon /></button>
                                    </div>
                            </div>
                            <div id='bookedDiv' className='w3-animate-bottom'>
                                <Carousel swipeable={true}
                                                draggable={false}
                                                showDots={true}
                                                responsive={responsive}
                                                ssr={true} // means to render carousel on server-side.
                                                infinite={false}>
                                                {cards = bookedslots.map(el =>{
                                                idb++;
                                                return <AppointmentCard data={el} key={idb} flag={"booked"}/>
                                                }) }
                                </Carousel> 
                            </div>
{/*resultDIV Start*/}
                        <div  id="resultDiv">
                            <Carousel swipeable={true}
                                            draggable={false}
                                            showDots={true}
                                            responsive={responsive}
                                            ssr={true} // means to render carousel on server-side.
                                            infinite={false}>
                                            {cards = filterbook.map(el =>{
                                            idc++;
                                            console.log(el)
                                            return <AppointmentCard data={el} key={idc}  flag={"booked"}/>
                                            })}
                            </Carousel>                                          
                        </div>   
{/*resultDIV End*/}         

                        </div>
                        <div className="tab-pane fade" id="nav-done" role="tabpanel" aria-labelledby="nav-done-tab">
                            <div className='datesearch p-3 m-3'>
                                    <div className='date'>
                                        <span className='result-subtext2 me-3'> <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 0 24 24" width="45"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg> </span>
                                        <input type="date" className="form-control w-auto d-inline" id="donedate" onSelect={ ()=>dateFilterDone()} /> <button className='btn btn-danger ms-2 ' id='reset' onClick={()=>ResetDone()} disabled={resetBtnDone}>Reset Filter</button>
                                    </div>
                                    <div className='search'>
                                    <input type="search" className="form-control w-auto d-inline" id="searchboxdone" placeholder='Search Slot by User ID' onChange={()=>resetSearch()}/><button className='btn btn-success search' onClick={()=>searchDone()}> <SearchIcon className='mt-0'/></button><button className='btn btn-success' onClick={()=>ResetDone()}><ClearIcon /></button>
                                    </div>
                            </div>
                            <div id='doneDiv' className='w3-animate-bottom'>
                                <Carousel swipeable={true}
                                                draggable={false}
                                                showDots={true}
                                                responsive={responsive}
                                                ssr={true} // means to render carousel on server-side.
                                                infinite={false}>
                                                {cards = doneslots.map(el =>{
                                                idd++;
                                                return <AppointmentCard data={el} key={idd}  flag={"done"}/>
                                                })}
                                </Carousel>
                            </div>
{/*resultDIV Start*/}
                        <div  id="doneresultDiv">
                            <Carousel swipeable={true}
                                            draggable={false}
                                            showDots={true}
                                            responsive={responsive}
                                            ssr={true} // means to render carousel on server-side.
                                            infinite={false}>
                                            {cards = filterdone.map(el =>{
                                            idc++;
                                            console.log(el)
                                            return <AppointmentCard data={el} key={idc}  flag={"done"}/>
                                            })}
                            </Carousel>                                          
                        </div>   
{/*resultDIV End*/}                                   
                        </div>                                                      
                </div>
            </div>    
    </div>  : " "} 
    </>
  )
}
export default  Appointments;