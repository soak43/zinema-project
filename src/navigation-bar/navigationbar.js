import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationSidebar = () => {
    const { pathname } = useLocation();
    const [ignore, active] = pathname.split("/");
//     let admin = true;
    return (
    <div className="list-group">
        <Link to={"/home "} className={`list-group-item bg-dark text-light 
                ${active === "home" ? "active" : ""} align-content-center`}>Home</Link>
        <Link to={"/search "} className={`list-group-item bg-dark text-light
                ${active === "search" ? "active" : ""}`}>Search</Link>
        <Link to={"/profile "} className={`list-group-item bg-dark text-light
                ${active === "profile" ? "active" : ""}`}>Profile
        </Link>
        {/* {admin && <Link to={"/allprofiles "} className={`list-group-item bg-dark text-light
                ${active === "allprofiles" ? "active" : ""}`}>All profiles</Link>} */}
        <Link to={"/settings "} className={`list-group-item bg-dark text-light
                ${active === "settings" ? "active" : ""}`}>Settings</Link>
        <Link to={"/signout "} className={`list-group-item bg-dark text-light
                ${active === "signout" ? "active" : ""}`}>Sign Out</Link>
    </div>
    );
};
export default NavigationSidebar;
