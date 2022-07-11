import React from 'react';
import EmployeeDetails from './EmployeeDetails'


const empDetails=()=>{

}

const Employees = empData =>{
    console.log(empData.empData);
    let data=[];
    data=empData.empData;

    return (
      
      <>
        <table className="table  caption-top table-bordered table-striped table-hover table-responsive mt-5">
          <caption>Showing 10 of 500</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Contact No</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((emp,i) => {
            return <tr data-bs-toggle="modal" data-bs-target="#exampleModal" key={i}>
              <th scope="row">{emp.id}</th>
              <td>{emp.firstName + " " + emp.lastName}</td>
              <td>{emp.contactNo}</td>
              <td>{emp.address}</td>
            </tr>
            })}
            
          </tbody>
        </table>
        <div className="">
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="http">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="http">
                  1
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                <a className="page-link" href="http">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="http">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="http">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <EmployeeDetails></EmployeeDetails>
      </>
    );
}

export default Employees