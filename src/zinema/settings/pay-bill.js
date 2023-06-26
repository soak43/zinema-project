import { Link } from "react-router-dom";
import Nav from "./nav";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { profileThunk, updateUserThunk } from "../services/auth-thunks";

function PayBill() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const save = async () => {
        const updatedProfile = { ...profile, billingStatus: "PAID" };
        await dispatch(updateUserThunk(updatedProfile));
        setProfile(updatedProfile);
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
        <Link className="nav-link" to="/zinema/settings-main">
          Profile
        </Link>
        <Link className="nav-link active ms-0" to="/zinema/billing">
          Billing
        </Link>
        <Link className="nav-link" to="/zinema/security">
          Security
        </Link>
      </nav>
      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="card h-100 mb-4 mb-xl-0">
            <div className="card-header">Card options</div>
            <Nav />
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="card h-100 mb-4">
            <div className="card-header">Payment Details</div>
            <div className="card-body">
              {profile?.billingStatus === 'PENDING' ? (
                <Link
                  to="/zinema/settings-main"
                  className="btn btn-primary"
                  type="button"
                  onClick={save}
                >
                  Pay Bill
                </Link>
              ) : (
                <h4>The payment is already done</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
    );
}

export default PayBill;