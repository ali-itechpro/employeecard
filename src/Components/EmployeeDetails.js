import React from 'react'
import moment from 'moment'

const EmployeeDetails = (props) => {
    const empRecord=props.emprecords;
    //console.log("empDetails page...",empRecord);
    return <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body row ">
                <div className="col-md-3 text-center">
                <img src={empRecord.avatar} alt={empRecord.firstName} className="img-avatar"></img>
                    <p className="fw-light mb-2v ">{empRecord.jobTitle}</p>
                    <p className="fw-light mb-2 font-small">Age: {empRecord.age}</p>
                    <p className="fw-light mb-2 font-small">Date Joined: {moment(empRecord.datejoined).format("MMM Do YY")}</p>
                </div>
                <div className="col-md-9">
                    <h2 className="border-bottom">{empRecord.firstName} {empRecord.lastName}</h2>
                    <p className="text-left">{empRecord.bio}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
}

export default EmployeeDetails