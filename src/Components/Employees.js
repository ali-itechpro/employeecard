import React, { useState,useEffect} from 'react'
import Search from './Search'
import EmployeeDetails from './EmployeeDetails'
import Header from './Header'
import Axios from 'axios'
import Pagination from 'react-paginate'


const Employees = () =>{

  const [compDetails, setCompDetails]=useState([]);
  const [empDetails, setEmpDetails]=useState([]);
  const [value, setValue]= useState("");
  const [pageCount, setpageCount] = useState(0);
  const [empRecords,setEmpRecords]= useState([])
  let limit = 10;


  useEffect(() => {
    // loading company details
    const fnCompDetails = async () => {
      return await Axios.get("http://localhost:5000/companyInfo")
        .then((res) => {
          setCompDetails(res.data);

        })
        .catch((err) => console.log(err.message));
    };
    fnCompDetails();

    // loading employee details
    const fnEmpDetails = async () => {
      return await Axios.get(
        `http://localhost:5000/employees?_page=1&_limit=${limit}`
      )
        .then((res) => {
          setEmpDetails(res.data);
          const total = Number(res.headers["x-total-count"]);
          console.log("total:", total);
          setpageCount(Math.ceil(total / limit));
        })
        .catch((err) => console.log(err.message));
    };
    fnEmpDetails();
  }, [limit]);

  // Search data
  console.log("pagecont:", pageCount);

    const SearchHandler = (e) => {
        e.preventDefault();
        return Axios.get(`http://localhost:5000/employees?q=${value}`)
        .then(res => {
          setEmpDetails(res.data);
          console.log("search clicked:", empDetails)
          setValue("");
        })
        .catch(err => err.message)
    }

    //fetch data
    const fetchData = async (currentPage) => {
      return await Axios.get(`http://localhost:5000/employees?_page=${currentPage}&_limit=${limit}`)
      .then(res => res.data)
      .catch(err => err.message)
    }

    const paginationHandler = async(data) =>{
      let currentPage = data.selected + 1;
      const fetchFormServer = await fetchData(currentPage);
      setEmpDetails(fetchFormServer);
      //console.log("paginationHandle...", empDetails)
    }

    const EmpDetailsHandler =(id)=>{
      //alert(id);
      const empRecord= empDetails.find(emp => {
        //console.log("emp indi record", emp);
        return emp.id == id;
      })
      setEmpRecords(empRecord);
      //console.log("emprecord...",empRecord);

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
              <th>&nbsp;</th>
              <th scope="col">Name</th>
              <th scope="col">Contact No</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {empDetails.length !==0 ?(empDetails.map((emp,i) => {
            return <tr data-bs-toggle="modal" data-bs-target="#exampleModal" key={i} onClick={()=>{EmpDetailsHandler(emp.id)}}>
              <td>{emp.id}</td>
              <td><img src={emp.avatar} alt={emp.firstName} className="img-avatar"></img></td>
              <td>{emp.firstName + " " + emp.lastName}</td>
              <td>{emp.contactNo}</td>
              <td>{emp.address}</td>
            </tr>
            })):(
              <tr><td className="alert alert-danger" role="alert" colSpan="4">Data not found</td>
              </tr>
            )}
            
          </tbody>
        </table>

        {/* paginations  */}
        <Pagination
        previousLabel={"previous"}
        nextLabel={"next"}
        activeClassName={"active"}
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={paginationHandler}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        nextClassName={"page-item"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
        <EmployeeDetails emprecords={empRecords}></EmployeeDetails>
        </main>
      </>
    );
}

export default Employees