import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Security() {
    // const { currentUser } = useSelector((state) => state.user);
    // const [profile, setProfile] = useState(currentUser);
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // const save = () => { dispatch(updateUserThunk(profile)); };
    // useEffect(() => {
    //     async function fetchData() {	
    //         const { payload } = await dispatch(profileThunk());	
    //         setProfile(payload);	
    //       }	
    //       fetchData();	
    //     }, [dispatch]);
    return (
        <div className="container-xl px-4 mt-4">
            <div>
                <nav className="nav nav-tabs mb-2">
                    <Link className="nav-link ms-0" to="/settings-main">Profile</Link>
                    <Link className="nav-link" to="/billing">Billing</Link>
                    <Link className="nav-link active" to="/security">Security</Link>
                </nav>
            <div style={{color: "black"}}>
                <h1>Security Page</h1>
                
                <div className="row">
                    <div className="col-4">
                        <label>Change Username</label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" type="text" placeholder="current-user-name"/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <label>Change Password</label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" type="text" placeholder="current-password"/>
                    </div>
                </div>
                <div className="mt-2">
                    <button className="btn btn-primary mt-2 mb-2 me-2"
                    onClick={() => {
                    navigate("/settings-main");
                    }}>                   Cancel</button>
                    <button className="btn btn-primary mt-2 mb-2"onClick={() => {
                    navigate("/settings");
                    }}>    Save  </button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Security;