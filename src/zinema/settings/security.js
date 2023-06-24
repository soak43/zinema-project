import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { profileThunk, updateUserThunk } from "../services/auth-thunks";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

function Security() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const save = () => { dispatch(updateUserThunk(profile)); };
    useEffect(() => {
        async function fetchData() {	
            const { payload } = await dispatch(profileThunk());	
            setProfile(payload);	
          }	
          fetchData();	
        }, [dispatch]);
    return (
        <div className="container-xl px-4 mt-4">
            <div>
                <nav className="nav nav-tabs mb-2">
                    <Link className="nav-link ms-0" to="/zinema/settings-main">Profile</Link>
                    <Link className="nav-link" to="/zinema/billing">Billing</Link>
                    <Link className="nav-link active" to="/zinema/security">Security</Link>
                </nav>
            <div style={{color: "black"}}>
                <h1>Security Page</h1>
                
                <div className="row">
                    <div className="col-4">
                        <label>Change Username</label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" type="text" placeholder="current-user-name" value={profile.username}
                            onChange={(event) => {
                              const newProfile = {
                              ...profile, username: event.target.value,
                              };
                              setProfile(newProfile);
                            }}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <label>Change Password</label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" type="password" placeholder="current-password" value={profile.password}
                            onChange={(event) => {
                              const newProfile = {
                              ...profile, password: event.target.value,
                              };
                              setProfile(newProfile);
                            }}/>
                    </div>
                </div>
                <div className="mt-2">
                    <Link to="/zinema/settings" className="btn btn-primary mt-2 mb-2 me-2" type="button">Cancel</Link>
                    <Link to="/zinema/settings" className="btn btn-primary mt-2 mb-2 me-2" type="button" onClick={save}>Save</Link>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Security;