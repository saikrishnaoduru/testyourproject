import { React, useEffect } from 'react'
import '../../styles/vc-center/report.css'
import { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, ArcElement } from 'chart.js';
import Sidebar from './vc-side-nav-draw/Sidebar';

ChartJS.register(
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement, ArcElement
)

function ReportGeneration() {


    const [data, setData] = useState({})
    const emailPass = localStorage.getItem("centerEmail");

    const getreportDetails = () => {
        return fetch("http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/stats/" + emailPass, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {

            if (result.status === 200) {
                return Promise.resolve(result.json());
            } else {
                return Promise.reject("Unable to retrieve the report details");
            }
        }).then(data => {
            setData(data)
        }).catch(error => {
            throw new Error(error);
        })
    }

    useEffect(() => {
        getreportDetails();
    }, []);

    var bardata = {
        datasets: [{
            data: [data?.COVISHIELD?.total, data?.COVAXIN?.total],
            backgroundColor: [
                'red',
                'blue'
            ]
        },
        ],
        labels: [
            'Covidsheild',
            'Covaxin'
        ],
    }

    var chartdata = {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Covaxin Dataset",
                data: data?.COVAXIN?.monthlyStats.map(x => x.totalVaccinationDone),
                backgroundColor: 'yellow',
                borderColor: 'red',
                tension: 0.4,
                pointStyle: 'rect',
                pointBorderColor: 'blue',
                pointBackgroundColor: '#fff',
                showLine: true
            },
            {
                label: "Covidsheild Dataset",
                data: data?.COVISHIELD?.monthlyStats.map(x => x.totalVaccinationDone),
                backgroundColor: 'yellow',
                borderColor: 'green',
                tension: 0.4,
                pointStyle: 'rect',
                pointBorderColor: 'blue',
                pointBackgroundColor: '#fff',
                showLine: true
            },
        ]
    }


    return (
        <>
            <Sidebar />
            <div className='report'>
                <div className='report-generate row'>
                    <div className='row mt-3'>
                        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Welcome to Report Board !!</h2>
                    </div>
                    <hr />
                    <div className='card p-5' style={{ backgroundColor: "whitesmoke" }}>
                        <div className='row text-center ms-5'>
                            <div className="col-sm-8 col-md-8 text-center bg-light shadow ms-5">
                                <Line data={chartdata}></Line>
                            </div>
                            <div className='col-sm-3  col-md-3 bg-light shadow ms-3'>
                                <Pie data={bardata} style={{ marginTop: "25%" }}></Pie>
                            </div>
                        </div>
                        <div className='row mt-5 ms-5'>
                            <div className="col-sm-5 col-md-5 bg-light shadow ms-5 p-3" style={{ height: "125px" }}>
                                <p style={{ fontWeight: "bold", fontSize: "16px" }}> Vaccine:Covidsheild <br />
                                    Vaccination Center:Appollo Hospital <br />
                                    Total Vaccinated:{data?.COVISHIELD?.total}
                                </p>
                            </div>
                            <div className="col-sm-6 col-md-6 bg-light shadow ms-3 p-3" style={{ height: "125px" }}>
                                <p style={{ fontWeight: "bold", fontSize: "16px" }}> Vaccine:Covaxin <br />
                                    Vaccination Center:Appollo Hospital <br />
                                    Total Vaccinated:{data?.COVAXIN?.total}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportGeneration
