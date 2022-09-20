import React, { useEffect, useState } from 'react'
import '../../styles/people/vaccinationdetails.css'
import jsPDF from 'jspdf'
import Sidebar from '../side-nav-drawer/Sidebar'

function Vaccinationdetails() {

    var [vaccineDetails, setvaccineDetails] = useState([])
    const [doseData, setdoseData] = useState([]);


    var emailPass = localStorage.getItem("userEmailId");
    const getVCDetails = () => {
        return fetch("http://44.207.171.169:8080/user-service/api/v1/user/alluser/" + emailPass, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {
            if (result.status === 200) {
                return Promise.resolve(result.json());
            } else {
                return Promise.reject("Unable to retrieve the user details");
            }
        }).then(vaccineData => {
            setvaccineDetails(vaccineData)
           // localStorage.setItem("data",vaccineData[0].userName)
        }).catch(error => {
            throw new Error(error);
        })
    }
    useEffect(() => {
        getVCDetails();
    }, []);

    console.log(vaccineDetails,"details")


    const generatePDF = () => {
        console.log(doseData,"diose")
        var doc = new jsPDF('p', 'pt');

    //    if(doseData==1){
        
        doc.text(150, 110, 'Certification for COVID-19 Vaccination')
        doc.setFont('helvetica')
        doc.text(200, 150, 'Certificate Id:123344')
        doc.setFont('helvetica')
        doc.text(200, 200, 'Benificiary Details:')
        doc.setFont('helvetica')

        doc.text(20, 230, 'Benificiary Name:')
        doc.setFont('helvetica')
        doc.text(200, 230, vaccineDetails[0].userName)
        doc.setFont('helvetica')

        doc.text(20, 250, 'Age:')
        doc.setFont('helvetica')
        doc.text(200, 250, (vaccineDetails[0].age.toString()))
        doc.setFont('helvetica')

        doc.text(20, 270, 'Gender:')
        doc.setFont('helvetica')

        doc.text(200, 270, vaccineDetails[0].gender)
        doc.setFont('helvetica')

        doc.text(20, 290, 'DOB')
        doc.setFont('helvetica')

        doc.text(200, 290, vaccineDetails[0].dateOfBirth)
        doc.setFont('helvetica')

        doc.text(20, 310, 'Benificiary User Id:')
        doc.setFont('helvetica')

        doc.text(200, 310, vaccineDetails[0].id)
        doc.setFont('helvetica')

        doc.text(20, 330, 'Vaccination Status:')
        doc.setFont('helvetica')

        doc.text(200, 330, ((doseData==2)?"Fully":"Partially"))
        doc.setFont('helvetica')

        doc.text(200, 360, 'Vaccination Details:')
        doc.setFont('helvetica')

        doc.text(20, 390, 'Vaccine Name:')
        doc.setFont('helvetica')

        doc.text(200, 390, (doseData==1)?vaccineDetails[0].userVaccinationInfo[0].vaccineType:vaccineDetails[0].userVaccinationInfo[1].vaccineType)
        doc.setFont('helvetica')

        doc.text(20, 410, 'Vaccine Type:')
        doc.setFont('helvetica')

        doc.text(200, 410, 'Covid-19')
        doc.setFont('helvetica')

        doc.text(20, 430, 'Dose No.:')
        doc.setFont('helvetica')

        doc.text(200, 430, (doseData==1)?(vaccineDetails[0].userVaccinationInfo[0].dose.toString()):(vaccineDetails[0].userVaccinationInfo[1].dose.toString()))
        doc.setFont('helvetica')

        doc.text(20, 450, 'Vaccinated At:')
        doc.setFont('helvetica')
        doc.text(200, 450, (doseData==1)?vaccineDetails[0].userVaccinationInfo[0].center:vaccineDetails[0].userVaccinationInfo[1].center)
        doc.setFont('helvetica')

        doc.text(20, 470, 'Date Of Dose:')
        doc.setFont('helvetica')
        doc.text(200, 470, (doseData==1)?vaccineDetails[0]?.userVaccinationInfo[0]?.dateOfVaccination:vaccineDetails[0]?.userVaccinationInfo[1]?.dateOfVaccination)
        doc.setFont('helvetica')

        // doc.text(20, 470, 'Vaccinated By:')
        // doc.setFont('helvetica')
        // doc.text(200, 470, (doseData==1)?vaccineDetails[0].userVaccinationInfo[0].vaccinatedBy:vaccineDetails[0].userVaccinationInfo[1].vaccinatedby)
        // doc.setFont('helvetica')


        doc.save('demo.pdf')
       
    //    }else{

    //    }
    }

    return (
        <>
          <Sidebar />
            {vaccineDetails.map((item,i) => {
              return  <div key={i} className='vacine-details  p-3'>
                    <div className='card shadow pe-3'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-1 col-md-1'>
                                    <div className="circle">
                                        <span><i className="fas fa-user-alt"></i></span>
                                    </div>
                                </div>
                                <div className='col-lg-11 col-md-11'>
                                    <div className='row'>
                                        <div className='col text-start'>
                                            <h6 className="mt-3" >{item.userName}</h6>
                                        </div>
                                    </div>


                                    <div className='row mt-4'>
                                        <div className="col">
                                            <h4 className="">User Id</h4>
                                        </div>
                                        <div className="col">
                                            <h4 className="">Age</h4>
                                        </div>
                                        <div className="col">
                                            <h4 className="">User Email</h4>
                                        </div>
                                        {/* <div className="col">
                                            <h4 className="">Id Number</h4>
                                        </div> */}
                                        <div className="col">
                                            <h4 className="">DOB</h4>
                                        </div>
                                    </div>

                                    <div className='row mt-2'>
                                        <div className="col">
                                            <h5 className="">{item.id}</h5>
                                        </div>
                                        <div className="col">
                                            <h5 className="">{item.age}</h5>
                                        </div>
                                        <div className="col">
                                            <h5 className="">{item.userEmailId}</h5>
                                        </div>
                                        {/* <div className="col">
                                            <h5 className="">{item.id_number}</h5>
                                        </div> */}
                                        <div className="col">
                                            <h5 className="">{item.dateOfBirth}</h5>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className='row mt-2'>
                                    {item?.userVaccinationInfo?.map((dose,j) => {
                                       return <div key={j} onClick={()=>{setdoseData(dose.dose)}} className='col shadow vaccine-track-card me-2'>
                                            <div className='row'>
                                                <div className='col text-start dose p-2'>
                                                    <p> {dose.dose} | {dose.vaccineType} <br />
                                                        {dose.center} <br />
                                                        {dose.centerAddress} <br />
                                                        {dose.dateOfVaccination}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                    </div>

                                    <div className='row mt-5 mb-10'>
                                        <div className='col text-center'>
                                            <h6 style={{ textDecorationLine: "underline", fontSize: "18px" }}>Vaccination Certificate</h6>
                                            <div className='box'>
                                                <button onClick={generatePDF}><i className="fas fa-file-download me-2"></i>Download here</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='card-footer mt-2'>
                            <div className='row'>
                                <div className='col-lg-3 share text-center'>
                                    Share Your Vaccination Status <i className="fas fa-share-alt-square ms-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </>
    )
}

export default Vaccinationdetails
