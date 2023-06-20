import { Link, useLocation } from "react-router-dom";
function Nav() {
    const active = useLocation();
 return (
    <div className="list-group position-relative">
       <Link to={"/zinema/view-card"} className={`list-group-item ${active === "view-card".toLowerCase() ? "active" : ""}`} >
            <div className="d-flex align-items-center">
                <span className="ms-2 d-xl-block d-xxl-block d-none">View Saved Cards</span>
            </div>
        </Link>
        <Link to={"/zinema/add-card"} className={`list-group-item ${active === "add-card".toLowerCase() ? "active" : ""}`} >
            <div className="d-flex align-items-center">
                <span className="ms-2 d-xl-block d-xxl-block d-none">Add Card</span>
            </div>
        </Link>
        <Link to={"/zinema/pay-bill"} className={`list-group-item ${active === "pay-bill".toLowerCase() ? "active" : ""}`} >
            <div className="d-flex align-items-center">
                <span className="ms-2 d-xl-block d-xxl-block d-none">Pay bill</span>
            </div>
        </Link>
    </div>
 );
}
export default Nav;