const Header = props => {
    let compInfo=[];
    compInfo=props.comp;
    console.log(compInfo)
  
    return <>
        <header className="header-con">
        <div>
            <h4>{compInfo.companyName}</h4>
        </div>
        <div className="row">
            <div className="col-md-6"><h6>{compInfo.companyMotto}</h6></div>
            <div className="col-md-6"><p className="comest">{compInfo.companyEst}</p></div>
        </div>
      </header>
    </>
}

export default Header