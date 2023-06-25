import "./index1.css";
import { Link, useNavigate } from "react-router-dom";
import { profileThunk, updateUserThunk } from "../services/auth-thunks";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

function SettingsMain() {
  const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => { dispatch(updateUserThunk(profile)); 
    console.log("settings profile", profile);
    navigate("/zinema/profile");};
    useEffect(() => {
        async function fetchData() {	
            const { payload } = await dispatch(profileThunk());	
            console.log("profilethunk", payload);
            setProfile(payload);	
          }	
          fetchData();	
        }, [dispatch]);
    return(
      <>
        <div className="container-xl px-4 mt-4">
          <nav className="nav nav-tabs mb-2">
            <a className="nav-link active ms-0" href="/zinema/settings-main">Profile</a>
            <a className="nav-link" href="/zinema/billing">Billing</a>
            <a className="nav-link" href="/zinema/security">Security</a>
          </nav>
          <div className="row">
            <div className="col-md-4">
              <div className="card h-100 mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <img className="img-account-profile rounded-circle mb-2" src={profile.profilePicture} alt=""/>
                  <button className="btn btn-primary mt-2" onClick={() => navigate("/zinema/image-selection")}>Upload new image</button>
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
                            <label className="small mb-1" for="inputFirstName">User type</label>
                            <input className="form-control" id="inputFirstName" type="text" placeholder="User type" value={profile.userType} disabled/>
                        </div>
                            
                        <div className="col-md-6">
                            <label className="small mb-1" for="inputLastName">Username</label>
                            <input className="form-control" id="inputLastName" type="text" placeholder="Username" value={profile.username} disabled/>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                                    
                        <div className="col-md-6">
                            <label className="small mb-1" for="inputFirstName">First name</label>
                            <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={profile.firstName}
                            onChange={(event) => {
                              const newProfile = {
                              ...profile, firstName: event.target.value,
                              };
                              setProfile(newProfile);
                              }} />
                        </div>
                        
                        <div className="col-md-6">
                            <label className="small mb-1" for="inputLastName">Last name</label>
                            <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={profile.lastName}
                            onChange={(event) => {
                              const newProfile = {
                              ...profile, lastName: event.target.value,
                              };
                              setProfile(newProfile);
                            }}/>
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label className="small mb-1" for="inputEmailAddress">Email address</label>
                        <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={profile.email}
                        onChange={(event) => {
                          const newProfile = {
                          ...profile, email: event.target.value,
                          };
                          setProfile(newProfile);
                        }}/>
                    </div>
                    
                    <div className="row gx-3 mb-3">
                        
                        <div className="col-md-6">
                            <label className="small mb-1" for="inputPhone">Phone number</label>
                            <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={profile.phoneNumber}
                            onChange={(event) => {
                              const newProfile = {
                              ...profile, phoneNumber: event.target.value,
                              };
                              setProfile(newProfile);
                            }}/>
                        </div>
                        
                        <div className="col-md-6">
                            <label className="small mb-1" for="inputBirthday">Birthday</label>
                            <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value={profile.dob}
                            onChange={(event) => {
                              const newProfile = {
                              ...profile, dob: event.target.value,
                              };
                              setProfile(newProfile);
                            }}/>
                        </div>
                    </div>
                  </form>
                  <button className="btn btn-primary" type="button" onClick={save}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SettingsMain;