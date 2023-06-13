function PrivateDetails( {user} ){

    // let u = user;

    return(
        <div>
             
            <h2>Personal Details</h2>

            <div className="row">
                <div className="col-5 pt-3">
                    <label for="firstName">First Name : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border" type="text" id="firstName" placeholder="Jane" disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label for="lastName">Last Name : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border" type="text" id="lastName" placeholder="Doe" disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label for="username">UserName : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border" type="text" id="username" placeholder="janedoe123" disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label for="email">Email : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border" type="email" id="email" placeholder="janed31@gmail.com" disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label for="password">Password : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input className="wd-no-input-border" type="password" id="password" placeholder="********" disabled /> 
                    </div>
                </div>
                <br/>
            </div>
        </div>
    );
}

export default PrivateDetails;