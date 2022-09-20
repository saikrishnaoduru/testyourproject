import React, { useEffect, useState, } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../../styles/vc-center/available-slots.css'
import ReactPaginate from "react-paginate";
import Modal from '@material-ui/core/Modal';
import { useForm } from 'react-hook-form';

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

    // const handleEditClose = () => {
    //     setEditOpen(false);
    // };v

    // const handleEditOpen = () => {
    //     setEditOpen(true)
    // };

    const { register, handleSubmit, formState: { isValid, touchedField, errors } } = useForm({
        mode: "onBlur"
    })

    const onSubmit = (data) => {
        console.log(data, "add")
        var timeSlots = {
            endTime: data.endTime,
            startTime: data.startTime,
            status: data.status,
            vaccinatorName: data.vaccinatorName
        }

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ timeSlots })
                };
                fetch('http://localhost:3001/SlotAvailability', requestOptions)
                    .then(response => response.json())
            } 
        

    

    const onEditSubmit = (data) => {
        console.log(data, "edit")
    };

    const customStyles = {
        position: 'absolute',
        borderRadius: '15px',
        // backgroundColor: 'white',
        boxShadow: '1px solid white',
        height: 500,
        width: 950,
        margin: 'auto'
    }


    const getSlotsDetails = () => {
        return fetch("http://localhost:3001/SlotAvailability", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {
            if (result.status === 200) {
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


    const usersPerPage = 3;
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

            <div className='availabel-slots container mt-3'>
                <div className='header container'>
                    <h4 className='mt-2 text-start ' style={{ fontWeight: "bold" }}>Welcome to our Available Slots Board!!!</h4>

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
                                    <div class="modal-body">
                                        <form id='form' onSubmit={handleSubmit(onSubmit)}>
                                            <div className='row'>
                                                <div className='col mt-3'>
                                                    <div className="">
                                                        <label htmlFor="vaccine" className="form-label">Vaccine Type</label>
                                                        <input type="text" className="form-control" id="vaccine" {...register("vaccine", {
                                                            required: "Please Enter Vaccine Type!",
                                                        })} />
                                                        <span style={{ color: "red", height: "15px" }}>{errors.vaccine?.message}</span>
                                                    </div>
                                                </div>
                                                <div className='col-sm-6 mt-3'>
                                                    <label htmlFor="vaccinatorName" className="form-label">Vaccinator Name</label>
                                                    <select id="vaccinatorName" className="form-select" aria-label="Default select example" {...register("vaccinatorName", {
                                                        required: "Please Enter Vaccinator Name",
                                                    })} >
                                                        <option selected>Select Vaccinator</option>
                                                        <option value="Bhartat">Bhartat</option>
                                                        <option value="Ramij">Ramij</option>
                                                        <option value="Depeeka">Depeeka</option>
                                                        <option value="Rohit">Rohit</option>
                                                    </select>
                                                    <span style={{ color: "red", height: "15px" }}>{errors.vaccinatorName?.message}</span>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col mt-3'>
                                                    <div className="">
                                                        <label htmlFor="date" className="form-label">Date</label>
                                                        <input type="date" className="form-control" id="date" {...register("date", {
                                                            required: "Please pick up date!",
                                                        })} />
                                                        <span style={{ color: "red", height: "15px" }}>{errors.date?.message}</span>
                                                    </div>
                                                </div>
                                                <div className='col mt-3'>
                                                    <label htmlFor="slots" className="form-label">Slots</label>
                                                    <select id="slots" className="form-select" aria-label="Default select example" {...register("status", {
                                                        required: "Please Enter Vaccine Type!",
                                                    })} >
                                                        <option selected>Select slot status</option>
                                                        <option value="Available">Available</option>
                                                        <option value="Unavailable">Unavailable</option>
                                                    </select>
                                                    <span style={{ color: "red", height: "15px" }}>{errors.status?.message}</span>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col mt-3'>
                                                    <div className="">
                                                        <label htmlFor="s-time3" className="form-label">Start Time</label>
                                                        <input type="time" className="form-control" id="s-time3" {...register("startTime", {
                                                            required: "Please pick up time!",
                                                        })} />
                                                        <span style={{ color: "red", height: "15px" }}>{errors.startTime?.message}</span>
                                                    </div>
                                                </div>
                                                <div className='col mt-3'>
                                                    <div className="">
                                                        <label htmlFor="s-time4" className="form-label">End Time</label>
                                                        <input type="time" className="form-control" id="s-time4" {...register("endTime", {
                                                            required: "Please pick up time!",
                                                        })} />
                                                        <span style={{ color: "red", height: "15px" }}>{errors.endTime?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn" onClick={handleSubmit(onSubmit)} style={{ backgroundColor: "#C58FCE" }}>Create Slots</button>
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
                        style={customStyles}
                    >
                        <div className="modal-content" style={{ height: "500px" }}>
                            <div className="modal-header" style={{ backgroundColor: "#C58FCE" }}>
                                <h2 className="modal-title">Edit Slots</h2>
                                    <i className="fas fa-times fa-2x" onClick={() => {setEditOpen(false)}}></i>
                            </div>
                            <div className="modal-body">
                                <form id='form1' onSubmit={handleSubmit(onEditSubmit)}>
                                    <div className='row'>
                                        <div className='col mt-3'>
                                            <div className="">
                                                <label htmlFor="vaccine1" className="form-label">Vaccine Type</label>
                                                <input type="text" className="form-control" id="vaccine1" {...register("vaccine", {
                                                    required: "Please Enter Vaccine Type!",
                                                })} value={modalData.vaccine} />
                                                <span style={{ color: "red", height: "15px" }}>{errors.vaccine?.message}</span>
                                            </div>
                                        </div>
                                        <div className='col-sm-6 mt-3'>
                                            <label htmlFor="vaccinatorName1" className="form-label">Vaccinator Name</label>
                                            <select id="vaccinatorName1" className="form-select" aria-label="Default select example" {...register("vaccinatorName", {
                                                required: "Please Enter Vaccinator Name",
                                            })} selected={modalSlotData.vaccinatorName} >
                                                <option value="Bhartat">Bhartat</option>
                                                <option value="Ramij">Ramij</option>
                                                <option value="Depeeka">Depeeka</option>
                                                <option value="Rohit">Rohit</option>
                                            </select>
                                            <span style={{ color: "red", height: "15px" }}>{errors.vaccinatorName?.message}</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col mt-3'>
                                            <div className="">
                                                <label htmlFor="date1" className="form-label">Date</label>
                                                <input type="date" className="form-control" id="date1" {...register("date", {
                                                    required: "Please pick up date!",
                                                })} value={modalData.date} />
                                                <span style={{ color: "red", height: "15px" }}>{errors.date?.message}</span>
                                            </div>
                                        </div>
                                        <div className='col mt-3'>
                                            <label htmlFor="slots1" className="form-label">Slots</label>
                                            <select id="slots1" className="form-select" aria-label="Default select example" {...register("status", {
                                                required: "Please Enter Vaccine Type!",
                                            })} selected={modalSlotData.status} >
                                                <option value="Available">Available</option>
                                                <option value="Unavailable">Unavailable</option>
                                            </select>
                                            <span style={{ color: "red", height: "15px" }}>{errors.status?.message}</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col mt-3'>
                                            <div className="">
                                                <label htmlFor="s-time1" className="form-label">Start Time</label>
                                                <input type="time" className="form-control" id="s-time1" {...register("startTime", {
                                                    required: "Please pick up time!",
                                                })} value={modalSlotData.startTime} />
                                                <span style={{ color: "red", height: "15px" }}>{errors.startTime?.message}</span>
                                            </div>
                                        </div>
                                        <div className='col mt-3'>
                                            <div className="">
                                                <label htmlFor="s-time2" className="form-label">End Time</label>
                                                <input type="time" className="form-control" id="s-time2" {...register("endTime", {
                                                    required: "Please pick up time!",
                                                })} value={modalSlotData.endTime} />
                                                <span style={{ color: "red", height: "15px" }}>{errors.endTime?.message}</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer d-flex">
                                <button type="button" className="btn" onClick={handleSubmit(onEditSubmit)} style={{ backgroundColor: "#C58FCE" }}>Update</button>
                                <button type="button" className="btn" style={{ backgroundColor: "#C58FCE" }}>Delete</button>
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

        </>
    )
}

export default AvailableSlots