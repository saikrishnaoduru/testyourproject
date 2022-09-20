import React, { useEffect, useState, } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../../styles/vc-center/available-slots.css'
import ReactPaginate from "react-paginate";
import Modal from '@material-ui/core/Modal';
import Sidebar from './vc-side-nav-draw/Sidebar';

var slotData = [];
function AvailableSlots() {

    const [slotsDetails, setslotsDetails] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setEditOpen] = React.useState(false);
    const [modalData, setModalData] = useState({});
    const [modalSlotData, setModalSlotData] = useState({});
    const handleClose = () => {
        setOpen(false);
        setOpen('');
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const onSubmit = (event) => {
        let centerEmail = localStorage.getItem("centerEmail");
        let vaccineCenter = localStorage.getItem("centerName");
        let centerAddress = localStorage.getItem("address");
        let country = localStorage.getItem("country");
        let city = localStorage.getItem("city");
        let pincode = localStorage.getItem("pincode");
        let state = localStorage.getItem("state");
        event.preventDefault();
        var { vaccine, vaccinatorName, date, slots, stime, etime, } = document.forms[0];
        var createSlots = {
            vaccinationCenterEmailId: centerEmail,
            vaccineCenterName: vaccineCenter,
            date: date.value,
            timeSlots: [
                {
                    endTime: etime.value,
                    startTime: stime.value,
                    status: slots.value,
                    vaccinatorName: vaccinatorName.value
                }
            ],
            location: {
                address: centerAddress,
                country: country,
                city: city,
                pinCode: pincode,
                state: state
            },
            vaccine: {
                vaccineType: vaccine.value.toUpperCase()
            }
        }

        var addSlots = {
            endTime: etime.value,
            startTime: stime.value,
            status: slots.value,
            vaccinatorName: vaccinatorName.value
        }

        // if (slotsDetails?.length == 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...createSlots })
            };
            fetch('http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/create', requestOptions)
                .then((result) => {
                    if (result.status === 201) {
                        setOpen(false);
                        getSlotsDetails();
                        return Promise.resolve(result.json());
                    } else {
                        return Promise.reject("Unable to add new Stots");
                    }
                })
        // } else {
        //     slotsDetails.forEach((item) => {
        //         if (item.date == date.value) {
        //             const requestOptions = {
        //                 method: 'PUT',
        //                 headers: { 'Content-Type': 'application/json' },
        //                 body: JSON.stringify({ ...addSlots })
        //             };
        //             fetch('http://localhost:8080/vaccination-center-service/api/v1/slots/add/' + item.id, requestOptions)
        //                 .then((result) => {
        //                     if (result.status === 200) {
        //                         setOpen(false);
        //                         getSlotsDetails();
        //                         return Promise.resolve(result.json());
        //                     } else {
        //                         return Promise.reject("Unable to add new Stots");
        //                     }
        //                 })
        //         } else if ((slotsDetails.lastIndexOf((item['date'] == date.value) == false))) {
        //             const requestOptions = {
        //                 method: 'POST',
        //                 headers: { 'Content-Type': 'application/json' },
        //                 body: JSON.stringify({ ...createSlots })
        //             };
        //             fetch('http://localhost:8080/vaccination-center-service/api/v1/slots/create', requestOptions)
        //                 .then((result) => {
        //                     if (result.status === 201) {
        //                         setOpen(false);
        //                         getSlotsDetails();
        //                         return Promise.resolve(result.json());
        //                     } else {
        //                         return Promise.reject("Unable to add new Stots");
        //                     }
        //                 })
        //         }
        //     })
        // }

    }

    const onEditSubmit = (event) => {
        event.preventDefault();
        var { vaccinatorName1, slots1, stime1, etime1, } = document.forms[0];
        var editSlots = {
            slotId: modalSlotData.slotId,
            endTime: etime1.value,
            startTime: stime1.value,
            status: slots1.value,
            vaccinatorName: vaccinatorName1.value
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editSlots })
        };
        fetch('http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/update', requestOptions)
            .then((result) => {
                if (result.status === 200) {
                    setEditOpen(false)
                    getSlotsDetails();
                    return Promise.resolve(result.json());
                } else {
                    return Promise.reject("Unable to Update Stots");
                }
            })


    };

    const onDelete = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/' + modalSlotData.slotId, requestOptions)
            .then((result) => {
                if (result.status === 200) {
                    setEditOpen(false)
                    getSlotsDetails();
                    return Promise.resolve(result.json());
                } else {
                    return Promise.reject("Unable to Update Stots");
                }
            })


    };

    const customStyles = {
        position: 'absolute',
        borderRadius: '15px',
        boxShadow: '1px solid white',
        height: 450,
        width: 950,
        margin: 'auto'
    }

    const editCSS = {
        position: 'absolute',
        borderRadius: '15px',
        boxShadow: '1px solid white',
        height: 350,
        width: 950,
        margin: 'auto'
    }

    const emailPass = localStorage.getItem("centerEmail");
    const getSlotsDetails = () => {
        return fetch("http://44.207.171.169:8080/vaccination-center-service/api/v1/slots/available/center/" + emailPass, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {

            if (result.status === 202) {
                return Promise.resolve(result.json());
            } else {
                return Promise.reject("Unable to retrieve the slots details");
            }
        }).then(data => {
            slotData = data;
            setslotsDetails(data)
        }).catch(error => {
            throw new Error(error);
        })
    }

    useEffect(() => {
        getSlotsDetails();

    }, []);


    ///Set Date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    const selectedDate = () => {
        var newdate = document.getElementById("date").value;
        return slotsDetails.filter((element) => {
            return newdate == element.date;
        });
    }

    const dateFilter = () => {
        var result = selectedDate();
        setslotsDetails(result);
    }

    const resetFilter = () => {
        const resultArr = slotData;
        document.getElementById("date").value = "yyyy-mm-dd"
        setslotsDetails(resultArr);

    }


    const usersPerPage = 7;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(slotsDetails.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const displayUsers = slotsDetails
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item, i) => {
            return <div key={i} className='row mt-2 slotDiv'>
                <div className='row mt-2'>
                    <div className='col-sm-3 dateRow'>
                        <h4>{item.date}</h4>
                    </div>
                </div>
                <div className='row mt-2'>
                    {item.timeSlots.map((itemSlot, j) => {
                        return <div key={j} className='col-sm-3 mb-2'>
                            <button className='p-2 slot-button' type="button">{itemSlot.startTime + "-" + itemSlot.endTime}<i onClick={() => {
                                setModalData(item);
                                setModalSlotData(itemSlot)
                                setEditOpen(true)
                            }} className="fas fa-pencil-alt ms-2"></i></button>

                        </div>
                    })
                    }
                </div>
            </div>
        }
        );


    return (
        <>
            <Sidebar />
            <div className='slotCheckAvailable'>
                <div className='availabel-slots container mt-3'>
                    <div className='header container'>
                        <h2 className='mt-2 text-start ' style={{ fontWeight: "bold" }}>Welcome to our Available Slots Board!!!</h2>

                    </div>
                    <div className='filters mt-4 p-2 shadow'>
                        <div className='row mt-2'>
                            <div className='col'>
                                <h4>Filter Results : </h4>
                            </div>
                            {/* Adding slot Modal Popup */}
                            <div className='col text-end'>
                                <button className='btn addNewSlots me-2' onClick={handleOpen}>Add New Slot<i className="fas fa-plus ms-2"></i></button>
                                <Modal
                                    onClose={handleClose}
                                    open={open}
                                    style={customStyles}
                                >
                                    <div className="modal-content" style={{ height: "500px" }}>
                                        <div className="modal-header" style={{ backgroundColor: "#C58FCE" }}>
                                            <h2 className="modal-title">Add New Slots</h2>
                                            <i className="fas fa-times fa-2x" onClick={handleClose} ></i>
                                        </div>
                                        <div className="modal-body">
                                            <form id='form' onSubmit={onSubmit}>
                                                <div className='row'>
                                                    <div className='col mt-3'>
                                                        <div className="">
                                                            <label htmlFor="vaccine" className="form-label">Vaccine Type</label>
                                                            <input type="text" className="form-control" id="vaccine" name="vaccine" required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-6 mt-3'>
                                                        <label htmlFor="vaccinatorName" className="form-label">Vaccinator Name</label>
                                                        <select id="vaccinatorName" name="vaccinatorName" className="form-select" aria-label="Default select example"  >
                                                            <option defaultValue>Select Vaccinator</option>
                                                            <option value="parul">parul</option>
                                                            <option value="Ramij">Ramij</option>
                                                            <option value="Depeeka">Depeeka</option>
                                                            <option value="Rohit">Rohit</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col mt-3'>
                                                        <div className="">
                                                            <label htmlFor="date" className="form-label">Date</label>
                                                            <input type="date" className="form-control" id="date" min={today} name="date" />
                                                        </div>
                                                    </div>
                                                    <div className='col mt-3'>
                                                        <label htmlFor="slots" className="form-label">Slots</label>
                                                        <select id="slots" name="slots" className="form-select" aria-label="Default select example"  >
                                                            <option defaultValue>Select slot status</option>
                                                            <option value="BOOKED">BOOKED</option>
                                                            <option value="AVAILABLE">AVAILABLE</option>
                                                            <option value="EXPIRED">EXPIRED</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col mt-3'>
                                                        <div className="">
                                                            <label htmlFor="stime" className="form-label">Start Time</label>
                                                            <input type="time" className="form-control" id="stime" name="stime" />
                                                        </div>
                                                    </div>
                                                    <div className='col mt-3'>
                                                        <div className="">
                                                            <label htmlFor="etime" className="form-label">End Time</label>
                                                            <input type="time" className="form-control" id="etime" name="etime" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn" onClick={onSubmit} style={{ backgroundColor: "#C58FCE" }}>Create Slots</button>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col-sm-4 d-flex'>
                                <span className='result-subtext2 me-3'> <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 0 24 24" width="45"><path d="M0 0h24v24H0z" fill="none" /><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" /></svg> </span>
                                <input type="date" className="form-control w-auto d-inline" id="date" min={today} onChange={() => dateFilter()} />
                                <input type='button' className='btn btn-danger ms-2 ' id='reset' value='Reset Filter' onClick={() => resetFilter()} />
                            </div>
                        </div>
                        {/* Rendering slots Section */}
                        {displayUsers}
                        {/*Edit Slot Modal Popup */}
                        <Modal
                            onClose={() => setEditOpen(false)}
                            open={openEdit}
                            style={editCSS}
                        >
                            <div className="modal-content" style={{ height: "500px" }}>
                                <div className="modal-header" style={{ backgroundColor: "#C58FCE" }}>
                                    <h2 className="modal-title">Edit Slots</h2>
                                    <i className="fas fa-times fa-2x" onClick={() => { setEditOpen(false) }}></i>
                                </div>
                                <div className="modal-body">
                                    <form id='form1' onSubmit={onEditSubmit}>
                                    <div className='row'>
                                            <div className='col mt-3'>
                                                <label htmlFor="slotId1" className="form-label">Slot Id</label>
                                                <input type="text" className="form-control" id="slotId1" name="slotId1" defaultValue={modalSlotData.slotId} readOnly/>
                                            </div>
                                            <div className='col mt-4'>
                                                <label htmlFor="vaccinatorName1" className="form-label">Vaccinator Name</label>
                                                <select id="vaccinatorName1" name="vaccinatorName1" className="form-select" aria-label="Default select example" defaultValue={modalSlotData.vaccinatorName} >
                                                    <option value="Ramij">Ramij</option>
                                                    <option value="parul">parul</option>
                                                    <option value="Depeeka">Depeeka</option>
                                                    <option value="Rohit">Rohit</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='row'>
                                        <div className='col mt-4'>
                                                <div className="">
                                                    <label htmlFor="etime1" className="form-label">End Time</label>
                                                    <input type="time" className="form-control" id="etime1" name="etime1" defaultValue={modalSlotData.endTime} />
                                                </div>
                                            </div>
                                
                                            <div className='col mt-4'>
                                                <div className="">
                                                    <label htmlFor="stime1" className="form-label">Start Time</label>
                                                    <input type="time" className="form-control" id="stime1" name="stime1" defaultValue={modalSlotData.startTime} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                        <div className='col-sm-6 mt-3'>
                                                <label htmlFor="slots1" className="form-label">Slots</label>
                                                <select id="slots1" name="slots1" className="form-select" aria-label="Default select example" defaultValue={modalSlotData.status} >
                                                    <option value="AVAILABLE">AVAILABLE</option>
                                                    <option value="BOOKED">BOOKED</option>
                                                    <option value="EXPIRED">EXPIRED</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer d-flex">
                                    <button type="button" className="btn" onClick={onEditSubmit} style={{ backgroundColor: "#C58FCE" }}>Update</button>
                                    <button type="button" className="btn" onClick={onDelete} style={{ backgroundColor: "#C58FCE" }}>Delete</button>
                                </div>
                            </div>
                        </Modal>

                        {/* Adding Pagination */}
                        <div className='mt-3'>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AvailableSlots