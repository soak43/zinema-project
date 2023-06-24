import { Link } from "react-router-dom"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginThunk } from "../services/auth-thunks"

const LoginScreen = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            dispatch(loginThunk({ username, password }));
            navigate("/zinema/home");
        } catch (e) {
            alert(e);
        }
    };

    return(
        <div className="row justify-content-center"> 
            <h1 className="text-center">Welcome Back to Zinema!</h1>

            <form className="w-50 text-center">

                <div className="form-group p-2">
                    <input type="text" className="form-control form-control-sm rounded-3" id="InputEmailOrPhone" placeholder="Email or Phone Number" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                </div>

                <div className="form-group p-2">
                    <input type="password" className="form-control form-control-sm rounded-3" id="InputPassword" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}>
                    </input>
                </div>

                <button className="row btn btn-warning fw-bold rounded-pill m-3 mb-0 " onClick={handleLogin}>
                    Login
                </button>

                <button className="row btn btn-outline-warning fw-bold rounded-pill m-3 mb-0">
                    <Link className="text-warning text-decoration-none fw-normal" to={`/`}>
                        Back
                    </Link>
                </button>
                
            </form>

        </div>
    )
}

export default LoginScreen;