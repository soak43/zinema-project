import React, {useState, useEffect} from "react";
import instance from "../axios";
import { Link
 } from "react-router-dom";
// import axios from "axios";
import "./Row.css";

function Row({title, url}){

    const [movies, setMovies] = useState([]);

    const fetchURL = "https://api.themoviedb/org/3/discover/tv?api_key=df7510bd7dd3fc3cf823106e7e473ecf&with_networks=213"

    //snippet of code which runs based on a specific condition.
    //runs when the row is loading
    //runs every time 'movies' changes

    //[url] indicates that useEffect() is dependent on this variable. Anytime the value of url changes, useEffect has to be updated. 

    // useEffect(() => {
    //     // if [], run once when the row loads and don't run again
    //     async function fetchData() {
    //         console.log("url = ",url);
    //         const request = await instance.get(fetchURL);
    //         console.log("request = ", request.data.results);
    //         setMovies(request.data.results);
    //         return request;
    //     }
    //     fetchData();
    // }, [url]);

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
        } catch (error) {
            console.log('Error:', error);
        }
    };



    return (
        <div className=" row">
          <h1>Favourite Movies</h1>
          <div className="row__posters">
            {movies.map((movie) => (
                <img width={200}
                key={movie.id}
                  className="row__poster"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
            ))}
          </div>
        </div>
      );
};

export default Row;