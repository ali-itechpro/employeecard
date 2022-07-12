import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../assets/css/custom.css'
import Header from './Header'
import Search from './Search'
import Employees from './Employees'
import data from '../data/sample-data.json'



const App=()=> {
  const compInfo= data.companyInfo;
  const empData= data.employees;

  //console.log(compInfo);
  return (
    <div className="container pt-2 pb-5">
      <Header comp={compInfo}/>
      <main>
            <Employees empData={empData} />
      </main>
    </div>
  );
}

export default App;
