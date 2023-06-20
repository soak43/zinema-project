import "./index1.css";
import { Link } from "react-router-dom";


function SettingsMain() {
    return(
        <>
            <div className="container-xl px-4 mt-4">
  <nav className="nav nav-tabs mb-2">
    <Link className="nav-link active ms-0" to="/zinema/settings-main">Profile</Link>
    <Link className="nav-link" to="/zinema/billing">Billing</Link>
    <Link className="nav-link" to="/zinema/security">Security</Link>
  </nav>
  <div className="row">
    <div className="col-md-4">
      <div className="card h-100 mb-4 mb-xl-0">
        <div className="card-header">Profile Picture</div>
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <img className="img-account-profile rounded-circle mb-2" src="../images/wd.avif" alt=""/>
          <button className="btn btn-primary mt-2" type="button">Upload new image</button>
        </div>
      </div>
    </div>
    <div className="col-md-8">
      <div className="card h-100 mb-4">
        <div className="card-header">User Details</div>
        <div className="card-body">
          <form>
            <div className="row gx-3 mb-3">
                <div className="col-md-6">
                    <label className="small mb-1" for="inputFirstName">Username</label>
                    <input className="form-control" id="inputFirstName" type="text" placeholder="Username" value="Username"/>
                </div>
                    
                <div className="col-md-6">
                    <label className="small mb-1" for="inputLastName">User type</label>
                    <input className="form-control" id="inputLastName" type="text" placeholder="User type" value="User type"/>
                </div>
            </div>
            <div className="row gx-3 mb-3">
                            
                <div className="col-md-6">
                    <label className="small mb-1" for="inputFirstName">First name</label>
                    <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name"/>
                </div>
                
                <div className="col-md-6">
                    <label className="small mb-1" for="inputLastName">Last name</label>
                    <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name"/>
                </div>
            </div>
            
            <div className="mb-3">
                <label className="small mb-1" for="inputEmailAddress">Email address</label>
                <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address"/>
            </div>
            
            <div className="row gx-3 mb-3">
                
                <div className="col-md-6">
                    <label className="small mb-1" for="inputPhone">Phone number</label>
                    <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number"/>
                </div>
                
                <div className="col-md-6">
                    <label className="small mb-1" for="inputBirthday">Birthday</label>
                    <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday"/>
                </div>
            </div>
          </form>
          <Link to="/zinema/settings" className="btn btn-primary" type="button">Save changes</Link>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
    );
}

export default SettingsMain;