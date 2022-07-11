import React from 'react'

const EmployeeDetails = () => {

    return <>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body row ">
                <div className="col-md-3 text-center">
                    <img src="..." className="imgAvatar"></img>
                    <h5>jobtitle</h5>
                    <h6>Age</h6>
                    <h6>Date Joined</h6>
                </div>
                <div className="col-md-9">
                    <h2 className="border-bottom">firstName lastName</h2>
                    <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            
            </div>
        </div>
        </div>
    </>
}

export default EmployeeDetails