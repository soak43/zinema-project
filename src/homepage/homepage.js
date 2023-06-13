import React from "react";
import NavigationSideBar from "../navigation-bar/navigationbar";
import NavigationSidebar from "../navigation-bar/navigationbar";
import MovieRow from "../Rows/movie-rows";

function Homepage(){

    const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;

    return(
        <div className="bg-dark text-light">
            <h1>Homepage</h1>
            <div className="row">
                <div className="col-2">
                    <NavigationSidebar />
                </div>
                <div className="col-8">
                    <input className="form-control" type="text" placeholder="Search Bar" />
                    <div className="row">
                        <MovieRow title="Favourties" url={url} />
                    </div>
                </div>
                <div className="col-2">
                    Search profiles
                    Following list
                </div>
            </div>
        </div>
    );
};

export default Homepage;