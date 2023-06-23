import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { profileThunk } from "../services/auth-thunks";


function PrivateDetails( {user} ){

    // let u = user;
    // console.log("u = ", u.username);

    // const {currentUser} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const {currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);

    useEffect(() => {
        async function loadProfile() {
            const {payload} = await dispatch(profileThunk());
            setProfile(payload);
        }
        loadProfile();
    },[dispatch]);


    return(
        <div>
             
            <h2>Personal Details</h2>

            <div className="row">
                <div className="col-5 pt-3">
                    <label className="fs-5" for="firstName">First Name : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input style={{ backgroundColor: '#f2f6fc' }} className="wd-no-input-border fs-5 text-black" type="text" id="firstName" value={profile.firstName} disabled /> 
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
                        <input style={{ backgroundColor: '#f2f6fc' }} className="wd-no-input-border fs-5 text-black" type="text" id="lastName" value={profile.lastName} disabled /> 
                    </div>
                </div>
                <br/>
            </div>

            <div className="row">
                <div className="col-5 pt-3">
                    <label className="fs-5" for="username">Username : </label>
                </div>
                <div className="col-5">
                    <div className = "ps-5">
                        <input style={{ backgroundColor: '#f2f6fc' }} className="wd-no-input-border fs-5 text-black" type="text" id="username" value={profile.username} disabled /> 
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
                        <input style={{ backgroundColor: '#f2f6fc' }} className="wd-no-input-border fs-5 text-black" type="email" id="email" value={profile.email} disabled /> 
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
                        <input style={{ backgroundColor: '#f2f6fc' }} className="wd-no-input-border fs-5 text-black" type="password" id="password" value={profile.password} disabled /> 
                    </div>
                </div>
                <br/>
            </div>
        </div>
    );
}

export default PrivateDetails;