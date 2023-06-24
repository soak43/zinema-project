import { Link } from "react-router-dom";
import { profileThunk, updateUserThunk } from "../services/auth-thunks";
import {createTuitThunk} from "../services/card-thunks";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Nav from "./nav";

function AddCard() {

    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const save = async () => {
      const response = await dispatch(createTuitThunk(profile)); // Use the createBillingThunk action
      const newCardId = response.payload._id;
      console.log(newCardId);
      const updatedUser = {
        ...profile,
        cardsList: profile.cardsList && !profile.cardsList.includes(newCardId)
          ? [...profile.cardsList, newCardId]
          : [newCardId],
      };
      dispatch(updateUserThunk(updatedUser)).then(() => {
        setProfile(updatedUser); // Update the profile state after dispatching the updateUserThunk action
      });
    };
    useEffect(() => {
      async function fetchData() {
        const { payload } = await dispatch(profileThunk());
        setProfile(payload);
      }
      fetchData();
    }, [dispatch]);
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
                <div className="card-header">Add Card Details</div>
                <div className="card-body">
                  <form>
                    
                    <div className="mb-3">
                        <label className="small mb-1" for="inputCard">Card number</label>
                        <input className="form-control" id="inputCard" placeholder="Enter your card number"
                        onChange={(event) => {
                          const newProfile = {
                          ...profile, cardNumber: event.target.value,
                          };
                          setProfile(newProfile);
                        }}/>
                    </div>
                    
                    <div className="row gx-3 mb-3">
                        
                        <div className="col-md-6">
                            <label className="small mb-1" for="inputExpiry">Expiry</label>
                            <input className="form-control" id="inputExpiry" placeholder="Enter expiry" 
                            onChange={(event) => {
                              const newProfile = {
                              ...profile, expiry: event.target.value,
                              };
                              setProfile(newProfile);
                            }}/>
                        </div>
                        
                        <div className="col-md-6">
                            <label className="small mb-1" for="inputCVV">CVV</label>
                            <input className="form-control" id="inputExpiry" type="text" placeholder="Enter CVV"
                            onChange={(event) => {
                              const newProfile = {
                              ...profile, cvv: event.target.value,
                              };
                              setProfile(newProfile);
                            }}/>
                        </div>
                    </div>
                  </form>
                  <Link to="/zinema/settings" className="btn btn-primary" type="button" onClick={save}>Add card</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    );
}

export default AddCard;