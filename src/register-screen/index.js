import { Link } from "react-router-dom"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerThunk } from "../services/auth-thunks"

const RegisterScreen = () => {

    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [userType, setUserType] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        try {
            await dispatch(registerThunk({firstName, lastName, email, phoneNumber, username, password, userType}));
            navigate("/profile/*")
        } catch (e) {
            alert(e);
        }
    }

    return(
        <div className="row justify-content-center">
            <h1 className="text-center">Create Your New Zinema Account</h1>

            <form className="w-50 text-center">

                Basic Information

                <div className="form-group p-2">
                    <input type="text" className="form-control form-control-sm rounded-3" id="InputFirstName"
                    placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
                </div>

                <div className="form-group p-2">
                    <input type="text" className="form-control form-control-sm rounded-3" id="InputLastName"
                    placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
                </div>

                <div className="form-group p-2">
                    <input type="email" className="form-control form-control-sm rounded-3" id="InputEmail" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                </div>

                <div className="form-group p-2">
                    <input type="text" className="form-control form-control-sm rounded-3" id="InputPhoneNumber"
                    placeholder="Phone Number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}></input>
                </div>

                New Account Information

                <div className="form-group p-2">
                    <input type="text" className="form-control form-control-sm rounded-3" id="InputUsername" placeholder="Create New Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                </div>

                <div className="form-group p-2">
                    <input type="password" className="form-control form-control-sm rounded-3" id="InputPassword" placeholder="Create New Password" value={password} onChange={(event) => setPassword(event.target.value)}>
                    </input>
                </div>

                <div className="form-group p-2">
                    <label htmlFor="InputPlan">Choose Your Plan</label>
                    <select name="plan" id="InputPlan" defaultValue={`default`} className="form-control" onChange={(event) => setUserType(event.target.value)}>
                        <option value={`default`}>Select a Streaming Plan</option>

                        <option value={`BASIC`}>Standard Plan - $7.99/mo</option>

                        <option value={`PREMIUM`}>Premium Plan - $16.99/mo</option>

                        <option value={`ADMIN`}>Admin Privileges - $199.99/mo</option>
                    </select>
                </div>

                <button type="submit" className="row btn btn-warning fw-bold rounded-pill m-3 mb-0" onClick={handleRegister}>
                    Create a New Zinema Account
                </button>

                <button type="submit" className="row btn btn-outline-warning fw-bold rounded-pill m-3 mb-0">
                    <Link className="text-warning text-decoration-none fw-normal" to={`/`}>
                        Back
                    </Link>
                </button>
            </form>

        </div>
    )
}

export default RegisterScreen