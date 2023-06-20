import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import "./index.css"

function Settings() {
  return (
    <>
      <div className="wd-overlap">
        <div>
          <h1 style={{color: 'black' }}> Manage Profile: </h1>
        </div>
        <div>
          <a className="thumbnail" href="settings.html">
            <div>
                <Link to="/zinema/settings-main">
                    <FontAwesomeIcon icon={faCog} style={{color: 'black' }} className="fa fa-cog fa-2x wd-overlap" />
                    <img src="/images/wd.avif" className="img-responsive" height="175px" width="175px" alt="img not fetched"/>
                </Link>
            </div>
          </a>
        </div>
        <div>
          <Link to="/zinema/logout" className="btn btn-primary text-white mt-2 wd-btn-radius me-3">
            Not you?
          </Link>
          <Link to="/zinema/home" className="btn btn-primary text-white mt-2 wd-btn-radius">
            Done
          </Link>
        </div>
      </div>
    </>
  );
}

export default Settings;