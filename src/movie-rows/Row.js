import React, {useState, useEffect} from "react";
import instance from "../axios";
import { Link } from "react-router-dom";
import following from "../following/following.json";
import followers from "../following/followers.json";
// import axios from "axios";
import "./Row.css";
// import profilepic1 from "../../public/images/"

function Row({title, url}){

    const [movies, setMovies] = useState([]);

    const fetchURL = "https://api.themoviedb/org/3/discover/tv?api_key=df7510bd7dd3fc3cf823106e7e473ecf&with_networks=213"

    //snippet of code which runs based on a specific condition.
    //runs when the row is loading
    //runs every time 'movies' changes

    //[url] indicates that useEffect() is dependent on this variable. Anytime the value of url changes, useEffect has to be updated. 

    useEffect(() => {
        fetchMovies();
      }, []);
    
    const fetchMovies = async () => {
        //the url will be replaced by the favourite movies from the database for the particular profile.
        const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            console.log(data.results);
        } catch (error) {
            console.log('Error:', error);
        }
    };



    return (
        <div>
            {/* Favourite movies row*/}
        <div className=" row">
          <h1>Favourite Movies</h1>
          <div className="row__posters">
            {movies.map((movie) => (
                <img 
                key={movie.id}
                  className="row__poster"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
            ))}
          </div>
        </div>

        {/* Following row*/}
        <div className="row">
            <h1>Following</h1>
            <div className="row__posters">
                {following.map((profile) => (
                    <Link to={`/profile/${profile._id}`}><img width={10}
                    key={profile._id}
                    className="row__profile rounded-circle"
                    src={`/images/${profile.image}`}
                    alt={profile.name}
                    /></Link>
                ))}
            </div>
        </div>

         {/* Followers row*/}
         <div className="row">
            <h1>Followers</h1>
            <div className="row__posters">
                {followers.map((profile) => (
                    <Link to={`/profile/${profile._id}`}><img width={10}
                    key={profile._id}
                    className="row__profile rounded-circle"
                    src={`/images/${profile.image}`}
                    alt={profile.name}
                    /></Link>
                ))}
            </div>
        </div>

        </div>
      );
};

export default Row;