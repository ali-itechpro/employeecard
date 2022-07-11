import React from 'react'

const Search = () => {
    return <>
        <div className="comp-search col-md-6 offset-md-6 row pt-5">
            <div className="col-md-8 pb-2"><input type="text" id="txtSearch" className="form-control"></input></div>
            <div className="col-md-4 d-grid pb-2"><button type="button" id="btnSearch" className="btn btn-primary btn-block">Search</button></div>
        </div>
            
    </>
}

export default Search;