import { Link } from "react-router-dom";
import Nav from "./nav";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findTuitsByIdThunk } from "../services/card-thunks";

function ViewCard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.cardsList) {
      dispatch(findTuitsByIdThunk(currentUser.cardsList))
        .then((response) => {
          setCardDetails(response.payload);
        })
        .catch((error) => {
          console.log("Error retrieving card details:", error);
        });
    }
  }, [dispatch, currentUser]);

  const renderCardDetails = () => {
    if (cardDetails.length === 0) {
      return <p>No cards found.</p>;
    }

    return cardDetails.map((card) => (
      <div key={card._id}>
        <p>Card Number: {card.cardNumber}</p>
        <p>Expiration Date: {card.expiry}</p>
        <p>CVV Number: {card.cvv}</p>
        <hr />
      </div>
    ));
  };

  return (
    <>
      <div className="container-xl px-4 mt-4">
          <nav className="nav nav-tabs mb-2">
            <Link className="nav-link" to="/zinema/settings-main">Profile</Link>
            <Link className="nav-link active ms-0" to="/zinema/billing">Billing</Link>
            <Link className="nav-link" to="/zinema/security">Security</Link>
          </nav>
          <div className="row">
            <div className="col-md-4">
              <div className="card h-100 mb-4 mb-xl-0">
                <div className="card-header">Card options</div>
                <Nav />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card h-100 mb-4">
                <div className="card-header">Card Details</div>
                <div className="card-body">
                     {renderCardDetails()}
                     </div>
                 </div>
                 </div>
             </div>
      </div>
    </>
  );
}

export default ViewCard;