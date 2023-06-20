import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationSidebar = () => {

    const { pathname } = useLocation();
    const [ignore, active] = pathname.split("/");
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser);

    return (
    <div className="list-group">
        <Link to={"/zinema/home"} className={`list-group-item
                ${active === "home" ? "active" : ""} align-content-center`}>Home</Link>
        <Link to={"/zinema/search-results"} className={`list-group-item
                ${active === "search-results" ? "active" : ""}`}>Search</Link>
        {!currentUser &&
                <Link to={"/zinema/register"} className={`list-group-item 
                ${active === "register" ? "active" : ""}`}>Register</Link>}
        {!currentUser &&
                <Link to={"/zinema/login"} className={`list-group-item 
                ${active === "login" ? "active" : ""}`}>Login</Link>}
        { currentUser &&
                <Link to={"/zinema/profile"} className={`list-group-item
                ${active === "profile" ? "active" : ""}`}>Profile
        </Link>}
        {/* {admin && <Link to={"/allprofiles "} className={`list-group-item bg-dark text-light
                ${active === "allprofiles" ? "active" : ""}`}>All profiles</Link>} */}
        <Link to={"/zinema/settings"} className={`list-group-item 
                ${active === "settings" ? "active" : ""}`}>Settings</Link>
        <Link to={"/zinema/signout"} className={`list-group-item 
                ${active === "signout" ? "active" : ""}`}>Sign Out</Link>
    </div>
    );
};
export default NavigationSidebar;
