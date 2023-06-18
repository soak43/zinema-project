import { Link } from "react-router-dom"

const RegisterScreen = () => {
    return(
        <div className="row justify-content-center">
            <h1 class="text-center">Create Your New Zinema Account</h1>

            <form className="w-50 text-center">

                Basic Information

                <div class="form-group p-2">
                    <input type="text" class="form-control form-control-sm rounded-3" id="InputFirstName"
                    placeholder="First Name"></input>
                </div>

                <div class="form-group p-2">
                    <input type="text" class="form-control form-control-sm rounded-3" id="InputLastName"
                    placeholder="Last Name"></input>
                </div>

                <div class="form-group p-2">
                    <input type="email" class="form-control form-control-sm rounded-3" id="InputEmail" placeholder="Email"></input>
                </div>

                <div class="form-group p-2">
                    <input type="text" class="form-control form-control-sm rounded-3" id="InputPhoneNumber"
                    placeholder="Phone Number"></input>
                </div>

                New Account Information

                <div class="form-group p-2">
                    <input type="text" class="form-control form-control-sm rounded-3" id="InputUsername" placeholder="Create New Username"></input>
                </div>

                <div class="form-group p-2">
                    <input type="password" class="form-control form-control-sm rounded-3" id="InputPassword" placeholder="Create New Password">
                    </input>
                </div>

                <div class="form-group p-2">
                    <label for="InputPlan">Choose Your Plan</label>
                    <select name="plan" id="InputPlan" class="form-control">
                        <option selected>Select a Streaming Plan</option>

                        <option value={`standard`}>Standard Plan - $7.99/mo</option>

                        <option value={`premium`}>Premium Plan - $16.99/mo</option>

                        <option value={`admin`}>Admin Privileges - $199.99/mo</option>
                    </select>
                </div>

                <button type="submit" class="row btn btn-warning fw-bold rounded-pill m-3 mb-0">
                    <Link className="text-dark fw-bold text-decoration-none" to={`/`}>
                        Create a New Zinema Account
                    </Link>
                </button>

                <button type="submit" class="row btn btn-outline-warning fw-bold rounded-pill m-3 mb-0">
                    <Link className="text-warning text-decoration-none fw-normal" to={`/`}>
                        Back
                    </Link>
                </button>
            </form>

        </div>
    )
}

export default RegisterScreen