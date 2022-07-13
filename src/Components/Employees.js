import React, { useState,useEffect} from 'react'
import Search from './Search'
import EmployeeDetails from './EmployeeDetails'
import Header from './Header'
import axios from 'axios'


const Employees = () =>{

  const [compDetails, setCompDetails]=useState([]);
  const [empDetails, setEmpDetails]=useState([]);
  const [value, setValue]= useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit]= useState(2);

  useEffect(()=>{
    fnCompDetails();
    fnEmpDetails(0,10,0);
  },[])


  // loading company details
  const fnCompDetails = async ()=>{
    return await axios.get("http://localhost:5000/companyInfo")
    .then(res => setCompDetails(res.data))
    .catch(err => console.log(err.message))
  }


  // loading employee details
  const fnEmpDetails = async (start, end, increase)=>{
    return await axios.get(`http://localhost:5000/employees?_start=${start}&_end=${end}`)
    .then(res => setEmpDetails(res.data))
    .catch(err => console.log(err.message))
  }

  console.log("app emp data:", empDetails);

    const SearchHandler = (e) => {
        e.preventDefault();
        return axios.get(`http://localhost:5000/employees?q=${value}`)
        .then(res => {
          setEmpDetails(res.data);
          console.log("search clicked:", empDetails)
          setValue("");
        })
        .catch(err => err.message)
    }



    return (
      <>
      {/* Header component */}
       <Header company={compDetails}/>

      <main>
       {/* search component */}
       <form onSubmit={SearchHandler}>
       <div className="comp-search col-md-6 offset-md-6 row pt-5">
            <div className="col-md-8 pb-2"><input type="text" className="form-control" placeholder="Search Name..." value={value} onChange={(e)=>{setValue(e.target.value)}}></input></div>
            <div className="col-md-4 d-grid pb-2"><button type="submit" id="btnSearch" className="btn btn-primary btn-block">Search</button></div>
        </div>
        </form>

        {/* list of employees */}
        <table className="table caption-top table-bordered table-striped table-hover table-responsive mt-5">
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
            {empDetails.length !==0 ?(empDetails.map((emp,i) => {
            return <tr data-bs-toggle="modal" data-bs-target="#exampleModal" key={i}>
              <th scope="row">{emp.id}</th>
              <td>{emp.firstName + " " + emp.lastName}</td>
              <td>{emp.contactNo}</td>
              <td>{emp.address}</td>
            </tr>
            })):(
              <th className="alert alert-danger" role="alert" colspan="4">Data not found</th>
            )}
            
          </tbody>
        </table>

        {/* paginations  */}
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

        <EmployeeDetails></EmployeeDetails>
        </main>
      </>
    );
}

export default Employees