import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../../styles/people/search.css';
import { useState, useEffect } from 'react';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import VcCards from './VCcards';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../side-nav-drawer/Sidebar'
var districtArrayfordisp, dname;
var pickVCenter = [];
var tempVCenter = [];
var datetopass;
var pinreset = false;
var reseting = false;

function SearchVaccinationCenter() {
    return (
        <>
            <Sidebar />
            <div className='search-container'>
                <SearchTab />
            </div>
        </>
    )
}


const getStateName = () => {
    return fetch("../../states-districts.json", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((result) => {
        if (result.status === 200) {
            return Promise.resolve(result.json());
        } else {
            return Promise.reject("Unable to retrieve the location");
        }
    }).then(stateDistrictLocation => {
        var states = stateDistrictLocation.states;
        createStateList(states);
        return states;
    }).catch(error => {
        throw new Error(error);
    })
}

const createStateList = (props) => {
    var stateArray = props;
    var list = document.getElementById("stateslist");
    let options = `<option value ="0">Select State</option>` ,i =0 ;
    stateArray.forEach(element => {
        i = i + 1;
        options = options + `
        <option value ="${i}">${element.state}</option>`;
    });
    list.innerHTML = options;

}

const getDistrictName = () => {
    var stateId = document.getElementById("stateslist").value;

    if (stateId > 0) {
        var disabledopt = document.getElementById("districtlist");
        disabledopt.disabled = false;

        return fetch("../../states-districts.json", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {
            if (result.status === 200) {
                return Promise.resolve(result.json());
            } else {
                return Promise.reject("Unable to retrieve the location");
            }
        }).then(stateDistrictLocation => {
            var districtNames = stateDistrictLocation.states[stateId - 1].districts;

            createDistrictList(districtNames);
            districtArrayfordisp = districtNames;

            return districtNames;
        }).catch(error => {
            throw new Error(error);
        })
    }

}
const createDistrictList = (props) => {
    var districtArray = props;
    var distlist = document.getElementById("districtlist");
    let distoptions = `<option value ="" >Select District</option>`, i = 0;
    districtArray.forEach(element => {
        i = i + 1;
        distoptions = distoptions + `
        <option value ="${i}">${element}</option>`;
    });
    distlist.innerHTML = distoptions;

}

const SearchTab = (props) => {


    const [vcarray, setVcarray] = useState([]);
    const [dateArr, setDateArr] = useState([]);
    const [dateflag, setDateflag] = useState(true);
    const [resetflag, setResetflag] = useState(true)

    useEffect(() => {
        getStateName();
      }, []);
      
///Set Date
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

    var ar = [1, 2, 3];
    var cards;
    var k = 0;
    var id;
    var failcount = 0;
    var successcount = 0;
    var pincount = 0;
    var distReset = [];


    const ShowLocresultinfo = (props) => {
        setDateflag(false)
        var distId = document.getElementById("districtlist").value;
        var dist = props;
        dname = dist[distId - 1];
        var a = document.getElementById("searchinfo");
        getVCenters(dname);
        var Locinfo = `Showing results for District : ${dname}`;
        a.innerHTML = Locinfo;


    }


    //get vaccination  centers json
    const getVCenters = (reseting) => {
        pickVCenter = [];
        // fetch("http://localhost:8080/user-service/api/v1/vaccination-center/getAllVaccinationCenter", {
            fetch("http://44.207.171.169:8080/user-service/api/v1/vaccination-center/getAllVaccinationCenter", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {
            if (result.status === 200) {
                return Promise.resolve(result.json());
            } else {
                return Promise.reject("Unable to retrieve the center");
            }
        }).then(centerData => {
            var vcenter = centerData;
            getVCentersByDistrict(vcenter, reseting);
        }).catch(error => {
            throw new Error(error);
        })
    }
    //get Vaccination Center district
    const getVCentersByDistrict = (vcDistArray, reseting) => {
        
        var z = 0;
        vcDistArray.map((ele) => {
            if (ele.address.district == dname) {
                tempVCenter[z] = ele;
                z = z + 1;
                
                return ele;
            }
        });


        if (tempVCenter.length > 0) {
            tempVCenter.map((e) => {
                getVaccineDetails(e, reseting)
            })
        }


    }
    async function getVaccineDetails(e, reseting) {
        var newdate = document.getElementById("date").value;
        datetopass = newdate;
        let url;
        if (reseting == true) {
            // url = 'http://localhost:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + today;
            url = 'http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + today;
            document.getElementById('date').value = today;
        }
        else {
            // url = 'http://localhost:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + newdate;
            url = 'http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + newdate;
        }

        try {
            await axios.get(url).then(res => {
                successcount = successcount + 1;
                PostNewVC(e, res.data[0]);
            });
        }
        catch (err) {
            failcount = failcount + 1;
            
        }

        if ((successcount + failcount) == tempVCenter.length) {
            setVcarray(pickVCenter);

            document.getElementById("noOfResults").innerHTML = successcount;
        }


    }
    const PostNewVC = (v1, v2) => {
        v1["vaccine"] = v2;
        pickVCenter.push(v1);
    }



    //get vaccination  centers json
    const getVCentersByPIN = (pinreset) => {
        pickVCenter = [];
        setVcarray([]);
        setDateflag(false);
        // return fetch("http://localhost:8080/user-service/api/v1/vaccination-center/getAllVaccinationCenter", {
            return fetch("http://44.207.171.169:8080/user-service/api/v1/vaccination-center/getAllVaccinationCenter", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {
            if (result.status === 200) {
                return Promise.resolve(result.json());
            } else {
                return Promise.reject("Unable to retrieve the center");
            }
        }).then(centerData => {
            var vcenter = centerData;
            getVCentersWithPIN(vcenter, pinreset);
            tempVCenter = [];
            return vcenter;
        }).catch(error => {
            throw new Error(error);
        })
    }
    //get Vaccination Center district
    const getVCentersWithPIN = (tempVCenter, pinreset) => {
        if (tempVCenter.length > 0) {
            tempVCenter.map((e) => {
                getVaccineDetailsByPIN(e, pinreset)
            })
        }
    }

    async function getVaccineDetailsByPIN(e, pinreset) {
        let pincode = document.getElementById("pincode").value;
        var newdate = document.getElementById("date").value;
        document.getElementById("pinsearchinfo").innerHTML = `Showing Results for PINCODE : ${pincode}`;
        let url;
        if (pinreset == true) {
            // url = 'http://localhost:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + today;
            url = 'http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + today;
            document.getElementById('pindate').value = today;
        } else {
            // url = 'http://localhost:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + newdate;
            url = 'http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + newdate;
        }

        try {
            await axios.get(url).then(res => {
                if (e.address.pincode == pincode) {
                    PostNewVCPIN(e, res.data[0]);
                    datetopass = newdate;
                }
            });
        }
        catch (err) {

        }
    }
    const PostNewVCPIN = (v1, v2) => {
        pincount++;
        v1["vaccine"] = v2;
        pickVCenter.push(v1);
        setVcarray(pickVCenter);
        distReset = pickVCenter;
        document.getElementById("pinResults").innerHTML = pincount;
    }



    const dateFilter = () => {
        setVcarray([]);
        pickVCenter = [];
        pincount = 0;
        var newdate = document.getElementById("date").value;
        datetopass = newdate;
        failcount = 0;
        successcount = 0;
         tempVCenter.map((e) => {
            //  let url = 'http://localhost:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + newdate;
            let url = 'http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + newdate;
            try {
                axios.get(url).then(res => {
                    successcount = successcount + 1;
                    /* PostNewVC(e , res.data[0]); */
                    e['vaccine'] = res.data[0];
                    pickVCenter.push(e);
                    datetopass = document.getElementById("date").value;
                    setVcarray(pickVCenter);
                });
            }
            catch (err) {
                failcount = failcount + 1;
              
            }
        })

        document.getElementById("noOfResults").innerHTML = successcount;

        setResetflag(false);
    }

    const datePINFilter = () => {
        setVcarray([]);
        // let url1 = "http://localhost:8080/user-service/api/v1/vaccination-center/getAllVaccinationCenter";
        let url1 = "http://44.207.171.169:8080/user-service/api/v1/vaccination-center/getAllVaccinationCenter";
        let pincode1 = document.getElementById("pincode").value;

        try {
            axios.get(url1).then(res => {
                var tempVCenter = res.data;
                if (tempVCenter.length > 0) {
                    tempVCenter.map((e) => {
                        var newdate1 = document.getElementById("pindate").value;
                        // let url2 = 'http://localhost:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + newdate1;
                        let url2 = 'http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/available/count/' + e.centerEmail + '?date=' + newdate1;
                        try {
                            axios.get(url2).then(res => {
                                if (e.address.pincode == pincode1) {
                                    datetopass = newdate1;
                                   
                                    PostNewVCPIN(e, res.data[0]);

                                }
                            });
                        }
                        catch (err) {

                        }
                    })
                }

            });
        }
        catch (err) {

        }
        setResetflag(false);
    }
    const resetFilter = () => {
        document.getElementById("pindate").value = today;
        setVcarray(distReset);
        setResetflag(true);
    }
    /* document.getElementById("resultDiv").style.display ='none'; */
    pickVCenter = []
    return (
        <div className='tabbed-search'>
            <div className='header container'>
                <h1 className='mt-2 text-center '>Find Your Nearest Vaccination Center</h1>
            </div>
            <div className='p-2'>
                <div className="nav nav-tabs mt-3" id="nav-tab" role="tablist">
                    <button className="nav-link active w-50 box-shadow no-box-border" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" style={{ "fontSize": "25px" }}>By District</button>
                    <button className="nav-link w-50 box-shadow no-box-border" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" style={{ "fontSize": "25px" }}>By PIN</button>

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
                                    <button type="button" className="btn btn-primary w-100 Searchbtn " onClick={() => ShowLocresultinfo(districtArrayfordisp)}>Search</button>
                                </div>

                            </div>
                        </form>
                        <div className='mt-4 box-shadow bg-light p-3 filtersection'>
                            <div>
                                <h5 className='result-subtext2 color-green' id='searchinfo' style={{ color: "green", "fontSize": "25px" }}></h5>
                                <h4 className='text-left mt-3'>Slot Search Results : <span className='result-subtext text-success'>[ <span id="noOfResults" >0</span> Result(s) Found ]</span></h4>
                            </div>
                            <div className='filters mt-3'>
                                <h4>Filter Results : </h4>
                                <div className='row mt-3'>
                                    <div>
                                        <span className='result-subtext2 me-3'> <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 0 24 24" width="45"><path d="M0 0h24v24H0z" fill="none" /><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" /></svg> </span>
                                        <input type="date" className="form-control w-auto d-inline" id="date" min={today} onChange ={() => dateFilter()} disabled={dateflag} defaultValue={today} /> <button className='btn btn-danger ms-2 ' id='reset' onClick={() => getVCenters(true)} disabled={resetflag}>Reset Filter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className='row'>
                            <div className='col-md-6 mt-2 d-flex justify-content-center'>
                                <input type="text" pattern="^[0-9]{6}$" maxLength={6} className="form-control w-50 m-auto" placeholder='Enter PINCODE' id='pincode' />
                            </div>

                            <div className='col-md-6 mt-2 d-flex justify-content-center'>
                                <button type="button" className="btn btn-primary w-50 Searchbtn" onClick={() => getVCentersByPIN()}>Search</button>
                            </div>
                        </div>
                        <div className='mt-4 box-shadow bg-light p-3 filtersection'>
                            <div>
                                <h5 className='result-subtext2 color-green' id='pinsearchinfo' style={{ color: "green", "fontSize": "25px" }}></h5>
                                <h4 className='text-left mt-3'>Slot Search Results : <span className='result-subtext text-success'>[ <span id="pinResults" >0</span> Result(s) Found ]</span></h4>
                            </div>
                            <div className='filters mt-3'>
                                <h4>Filter Results : </h4>
                                <div className='row mt-3'>
                                    <div>
                                        <span className='result-subtext2 me-3'> <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 0 24 24" width="45"><path d="M0 0h24v24H0z" fill="none" /><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" /></svg> </span>
                                        <input type="date" className="form-control w-auto d-inline" id="pindate" min={today} onChange={() => datePINFilter()} disabled={dateflag} defaultValue={today} /> <button className='btn btn-danger ms-2 ' id='reset' onClick={() => getVCentersByPIN(true)} disabled={resetflag}>Reset Filter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


            <div id='normalDiv'>
                <Carousel swipeable={true}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={false}>
                    {cards = vcarray.map(el => {
                        k++;
                        id= el.centerEmail +"#"+datetopass;
                        return <VcCards key={el.centerId} ele={el}  datetopass={datetopass} />
                    })}
                </Carousel>
            </div>
        </div>

    );
}

export default SearchVaccinationCenter;