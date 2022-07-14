import React, { useState,useEffect} from 'react'
import EmployeeDetails from './EmployeeDetails'
import Header from './Header'
import Axios from 'axios'
import Pagination from 'react-paginate'
import 'font-awesome/css/font-awesome.min.css';


const Employees = () =>{

  const [compDetails, setCompDetails]=useState([]);
  const [empDetails, setEmpDetails]=useState([]);
  const [value, setValue]= useState("");
  const [pageCount, setpageCount] = useState(0);
  const [empRecords,setEmpRecords]= useState([]);
  const [totalRecords, setTotalRecords]=useState(0);
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
          const totalRecords = Number(res.headers["x-total-count"]);
          setTotalRecords(totalRecords);
          //console.log("total:", totalRecords);
          setpageCount(Math.ceil(totalRecords / limit));
        })
        .catch((err) => console.log(err.message));
    };

    fnEmpDetails();
  }, [limit]);

  // Search data
  //console.log("pagecont:", pageCount);

    const SearchHandler = (e) => {
        e.preventDefault();
        return Axios.get(`http://localhost:5000/employees?q=${value}`)
        .then(res => {
          setEmpDetails(res.data);
          //console.log("search clicked:", empDetails)
          setValue("");
        })
        .catch(err => err.message)
    }

    //fetch data
    const fetchData = async (currentPage) => {
      //currentPageState(currentPage);
      return await Axios.get(`http://localhost:5000/employees?_page=${currentPage}&_limit=${limit}`)
      .then(res => res.data)
      .catch(err => err.message)
     
    }

    const paginationHandler = async(data) =>{
      let currentPage = data.selected + 1;
      //currentPageState(currentPage);
      const fetchFormServer = await fetchData(currentPage);
      setEmpDetails(fetchFormServer);
      //console.log("paginationHandle...", empDetails)
    }

    const EmpDetailsHandler =(id)=>{
      const empRecord= empDetails.find(emp => {
        //console.log("emp individual record", emp);
        return emp.id === id;
      })
      setEmpRecords(empRecord);
      //console.log("emprecord...",empRecord);
    }

    const SortingUp = sortVal => {
      Axios.get(`http://localhost:5000/employees?_sort=${sortVal}&_order=asc`)
      .then(res => {
        setEmpDetails(res.data);
        //console.log("asc...",empDetails);
      })
      .catch(err => err.message);
    }

    const SortingDown = sortVal => {
      Axios.get(`http://localhost:5000/employees?_sort=${sortVal}&_order=desc`)
      .then(res => {
        setEmpDetails(res.data);
        //console.log("desc...", empDetails);
      })
      .catch(err => err.message);
     
    }

    return (
      <>
        {/* Header component */}
        <Header company={compDetails} />

        <main>
          {/* search component */}
          <form onSubmit={SearchHandler}>
            <div className="comp-search col-md-6 offset-md-6 row pt-5">
              <div className="col-md-8 pb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Name..."
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-md-4 d-grid pb-2">
                <button
                  type="submit"
                  id="btnSearch"
                  className="btn btn-primary btn-block"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* list of employees */}
          <div className="table-responsive">
            <table className="table caption-top table-bordered table-striped table-hover table-responsive table-responsive-sm mt-5 dataTable">
              <caption>Total Records: {totalRecords}</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>&nbsp;</th>
                  <th>
                    <div className="icon-parent">
                      <div className="float-start icon-label">Name &nbsp;</div>
                      <div className="float-start">
                        <i
                          className="fa fa-sort-up icon-sort"
                          onClick={() => SortingUp("firstName")}
                        ></i>
                        <i
                          className="fa fa-sort-down icon-sort"
                          onClick={() => SortingDown("firstName")}
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="icon-parent">
                      <div className="float-start icon-label">
                        Contact No &nbsp;
                      </div>
                      <div className="float-start">
                        <i
                          className="fa fa-sort-up icon-sort"
                          onClick={() => SortingUp("contactNo")}
                        ></i>
                        <i
                          className="fa fa-sort-down icon-sort"
                          onClick={() => SortingDown("contactNo")}
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="icon-parent">
                      <div className="float-start icon-label">
                        Address &nbsp;
                      </div>
                      <div className="float-start">
                        <i
                          className="fa fa-sort-up icon-sort"
                          onClick={() => SortingUp("address")}
                        ></i>
                        <i
                          className="fa fa-sort-down icon-sort"
                          onClick={() => SortingDown("address")}
                        ></i>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {empDetails.length !== 0 ? (
                  empDetails.map((emp, i) => {
                    return (
                      <tr
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        key={i}
                        onClick={() => {
                          EmpDetailsHandler(emp.id);
                        }}
                      >
                        <td>{emp.id}</td>
                        <td>
                          <img
                            src={emp.avatar}
                            alt={emp.firstName}
                            className="img-avatar"
                          ></img>
                        </td>
                        <td>{emp.firstName + " " + emp.lastName}</td>
                        <td>{emp.contactNo}</td>
                        <td>{emp.address}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="alert alert-danger" role="alert" colSpan="5">
                      Data not found
                      
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* paginations  */}
          
          {empDetails.length !== 0 ? 
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
            pageRangeDisplayed={2}
            onPageChange={paginationHandler}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            nextClassName={"page-item"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />:null
            }
          <EmployeeDetails emprecords={empRecords}></EmployeeDetails>
        </main>
      </>
    );
}

export default Employees