import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationSidebar = () => {

    const { pathname } = useLocation();
    const [ignore, active] = pathname.split("/");

//     const {currentUser} = useSelector((state) => state.user);

    return (
    <div className="list-group">
        <Link to={"/home "} className={`list-group-item
                ${active === "home" ? "active" : ""} align-content-center`}>Home</Link>
        <Link to={"/search-results "} className={`list-group-item
                ${active === "search-results" ? "active" : ""}`}>Search</Link>
        <Link to={"/register "} className={`list-group-item 
                ${active === "register" ? "active" : ""}`}>Register</Link>
        <Link to={"/login "} className={`list-group-item 
                ${active === "login" ? "active" : ""}`}>Login</Link>
        <Link to={"/profile "} className={`list-group-item
                ${active === "profile" ? "active" : ""}`}>Profile
        </Link>
        {/* {admin && <Link to={"/allprofiles "} className={`list-group-item bg-dark text-light
                ${active === "allprofiles" ? "active" : ""}`}>All profiles</Link>} */}
        <Link to={"/settings "} className={`list-group-item 
                ${active === "settings" ? "active" : ""}`}>Settings</Link>
        <Link to={"/signout "} className={`list-group-item 
                ${active === "signout" ? "active" : ""}`}>Sign Out</Link>
    </div>
    );
};
export default NavigationSidebar;
