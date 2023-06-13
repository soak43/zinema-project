import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationSidebar = () => {
    const { pathname } = useLocation();
    const [ignore, active] = pathname.split("/");
    return (
    <div className="list-group">
        <Link to={"/home "} className={`list-group-item
                ${active === "home" ? "active" : ""} align-content-center`}>Home</Link>
        <Link to={"/search "} className={`list-group-item
                ${active === "search" ? "active" : ""}`}>Search</Link>
        <Link to={"/profile "} className={`list-group-item
                ${active === "profile" ? "active" : ""}`}>Profile
        </Link>
        <Link to={"/settings "} className={`list-group-item
                ${active === "settings" ? "active" : ""}`}>Settings</Link>
        <Link to={"/signout "} className={`list-group-item
                ${active === "signout" ? "active" : ""}`}>Sign Out</Link>
    </div>
    );
};
export default NavigationSidebar;
