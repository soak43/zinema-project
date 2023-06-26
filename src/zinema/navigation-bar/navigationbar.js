import React from "react";

import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";




const NavigationSidebar = () => {




    const { pathname } = useLocation();

    const [ignore, zinema, active] = pathname.split("/");

    const { currentUser } = useSelector((state) => state.user);

    console.log(currentUser);




    return (

    <div className="list-group">

        <Link to={"/zinema/home"} className={`list-group-item

                ${active === "home" ? "active" : ""} align-content-center`}>

                        <i className="bi bi-house"></i>

                        <span className="d-none d-md-none d-lg-inline d-xl-inline">

                                &nbsp; Home

                        </span>

        </Link>




        <Link to={"/zinema/search-results"} className={`list-group-item

                ${active === "search-results" ? "active" : ""}`}>

                        <i className="bi bi-search"></i>

                        <span className="d-none d-md-none d-lg-inline d-xl-inline">

                                &nbsp; Search

                        </span>

        </Link>




        {!currentUser &&

                <Link to={"/zinema/register"} className={`list-group-item

                ${active === "register" ? "active" : ""}`}>

                        <i className="bi bi-r-square"></i>

                        <span className="d-none d-md-none d-lg-inline d-xl-inline">

                                &nbsp; Register

                        </span>

        </Link>}




        {!currentUser &&

                <Link to={"/zinema/login"} className={`list-group-item

                ${active === "login" ? "active" : ""}`}>

                        <i className="bi bi-box-arrow-in-right"></i>

                        <span className="d-none d-md-none d-lg-inline d-xl-inline">

                                &nbsp; Login

                        </span>

        </Link>}




        { currentUser &&

                <Link to={"/zinema/profile"} className={`list-group-item

                ${active === "profile" ? "active" : ""}`}>

                        <i className="bi bi-person"></i>

                        <span className="d-none d-md-none d-lg-inline d-xl-inline">

                                &nbsp; Profile

                        </span>

        </Link>}

        {/* {admin && <Link to={"/allprofiles "} className={`list-group-item bg-dark text-light

                ${active === "allprofiles" ? "active" : ""}`}>All profiles</Link>} */}

        

        { currentUser &&

                <Link to={"/zinema/settings-main"} className={`list-group-item

                ${active === "settings-main" ? "active" : ""}`}>

                        <i className="bi bi-gear"></i>

                        <span className="d-none d-md-none d-lg-inline d-xl-inline">

                                &nbsp; Settings

                        </span>

                </Link>

        }

        

        { currentUser &&

                <Link to={"/zinema/settings"} className={`list-group-item

                ${active === "signout" ? "active" : ""}`}>

                        <i className="bi bi-box-arrow-in-left"></i>

                        <span className="d-none d-md-none d-lg-inline d-xl-inline">

                                &nbsp; Sign Out

                        </span>

                </Link>}

        

    </div>

    );

};

export default NavigationSidebar;
