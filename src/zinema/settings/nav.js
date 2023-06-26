import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ active }) {
  return (
    <div className="list-group position-relative">
      <Link
        to="/zinema/view-card"
        className={`list-group-item ${
          active === 'view-card'.toLowerCase() ? 'active' : ''
        }`}
      >
        <div className="d-flex align-items-center">
          <span className="ms-2 d-none d-sm-block">View Saved Cards</span>
        </div>
      </Link>
      <Link
        to="/zinema/add-card"
        className={`list-group-item ${
          active === 'add-card'.toLowerCase() ? 'active' : ''
        }`}
      >
        <div className="d-flex align-items-center">
          <span className="ms-2 d-none d-sm-block">Add Card</span>
        </div>
      </Link>
      <Link
        to="/zinema/pay-bill"
        className={`list-group-item ${
          active === 'pay-bill'.toLowerCase() ? 'active' : ''
        }`}
      >
        <div className="d-flex align-items-center">
          <span className="ms-2 d-none d-sm-block">Pay bill</span>
        </div>
      </Link>
    </div>
  );
}

export default Nav;
