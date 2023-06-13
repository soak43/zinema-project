function PrivateDetails( {user} ){

    let u = user;
    console.log("u = ", u.username);

    return(
        <div>
             
            <h2>Personal Details</h2>

            <div className="row">
                <div className="col-5 pt-3">
                    <label className="fs-5" for="firstName">First Name : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border fs-5 bg-dark text-white" type="text" id="firstName" value={u.firstname} disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label className="fs-5" for="lastName">Last Name : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border fs-5 bg-dark text-white" type="text" id="lastName" value={u.lastname} disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label className="fs-5" for="username">UserName : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border fs-5 bg-dark text-white" type="text" id="username" value={u.username} disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label className="fs-5" for="email">Email : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border fs-5 bg-dark text-white" type="email" id="email" value={u.email} disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label className="fs-5" for="password">Password : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border fs-5 bg-dark text-white" type="password" id="password" value={u.password} disabled /> 
                    </div>
                </div>
                <br/>
            </div>
        </div>
    );
}

export default PrivateDetails;