const Header = props => {
    let comData={};
    comData=props.company;
    //console.log(typeof(comData))
  
    return <>
        <header className="header-con">
        <div>
            <h4>{comData.companyName}</h4>
        </div>
        <div className="row">
            <div className="col-md-6"><h6>{comData.companyMotto}</h6></div>
            <div className="col-md-6"><p className="comest">{comData.companyEst}</p></div>
        </div>
      </header>
    </>
}

export default Header