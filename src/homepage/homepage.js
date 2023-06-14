import React from "react";
import NavigationSidebar from "../navigation-bar/navigationbar";
import MovieRow from "../Rows/movie-rows";
import ProfileRows from "../Rows/profile-rows";
import "./homepage.css";

function Homepage(){

    const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";
    const url_comedy = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
    const url_horror = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`;
    const url_romantic = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`;

    return(
        <div className="bg-dark text-light">
            <h1>Homepage</h1>
            <div className="row">
                <div className="col-2">
                    <NavigationSidebar />
                </div>
                <div className="col-8">
                    <input className="form-control mb-2 bg" type="text" placeholder="Search Movies or TV Shows" />
                    <div className="row">
                        <MovieRow title="Favourties" url={url_comedy} />
                    </div>
                    <div className="row">
                        <MovieRow title="Horror" url={url_horror} />
                    </div>
                    <div className="row">
                        <MovieRow title="Romantic" url={url_romantic}/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row">
                        <input className="form-control" type="text" placeholder="Search Profiles"/>
                    </div>
                    <div className="row">
                        Following
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;