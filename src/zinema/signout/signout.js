import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutThunk } from "../services/auth-thunks";
function SignOut() {

    const {currentUser} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(
        <div>
            <h1 className="pt-5 pb-5"> Hey {currentUser.firstName}, are you sure you want to sign out?</h1>

            <div className="row">
                <div className="col-12">
                <button className="btn btn-danger mt-2" onClick={() => {
                    dispatch(logoutThunk());
                    navigate("/zinema/login");
                }}>Logout</button>
                
                <button className="btn btn-primary mt-2" onClick={() => {
                    navigate("/zinema/home");
                }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default SignOut;