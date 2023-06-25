import React from 'react';
import { Link } from 'react-router-dom';
import Nav from "./nav";

function Billing() {
  return (
    <div className="container-xl px-4 mt-4">
      <nav className="nav nav-tabs mb-2">
        <Link className="nav-link ms-0" to="/zinema/settings-main">
          Profile
        </Link>
        <Link className="nav-link active" to="/zinema/billing">
          Billing
        </Link>
        <Link className="nav-link" to="/zinema/security">
          Security
        </Link>
      </nav>
      <div style={{ color: 'black' }} className="row">
        <h1>Billing Page</h1>
        <div className="col-md-4">
          <div className="card h-100 mb-4 mb-xl-0">
            <Nav />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card h-100 mb-4">
            <div className="col-12 col-lg-9">
              {/* Your billing content goes here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;