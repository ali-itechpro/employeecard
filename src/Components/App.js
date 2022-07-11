import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../assets/css/custom.css'
import Search from './Search';
import Employees from './Employees'
import data from '../data/sample-data.json'



const App=()=> {
  const compInfo= data.companyInfo;
  const empData= data.employees;

  //console.log(empData);

  return (
    <div className="container pt-2 pb-5">
      <header className="header">
        <div>
            <h4>{compInfo.companyName}</h4>
        </div>
        <div className="row">
            <div className="col-md-6"><h6>{compInfo.companyMotto}</h6></div>
            <div className="col-md-6"><p className="comest">{compInfo.companyEst}</p></div>
        </div>
      </header>
      <main>
            <Search></Search>
            <Employees empData={empData}></Employees>
           
      </main>
    </div>
  );
}

export default App;
