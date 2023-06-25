import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import "./index.css"
import { useSelector } from "react-redux";
import { useState } from "react";
import { logoutThunk } from "../services/auth-thunks";
import { useDispatch } from "react-redux";

function Settings() {
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
        dispatch(logoutThunk());
        navigate("/zinema/home");
    } catch (e) {
        alert(e);
    }
};
  return (
    <>
      <div className="wd-overlap">
        <div>
          <h1 style={{color: 'black' }}>  Sign Out </h1>
        </div>
        <div>
          <a className="thumbnail">
            <div>
                <FontAwesomeIcon icon={faCog} style={{color: 'black' }} className="fa fa-cog fa-2x wd-overlap" />
                <img src={profile.profilePicture} className="img-responsive" height="175px" width="175px" alt="img not fetched"/>
            </div>
          </a>
        </div>
        <div>
          <button onClick={handleLogout} className="btn btn-primary text-white mt-2 wd-btn-radius me-3">
            Not you?
          </button>
          <button onClick={() => navigate("/zinema/profile")} className="btn btn-primary text-white mt-2 wd-btn-radius">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;