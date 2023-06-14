import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./row.css"



function MovieRow({title, url}){

    const [movies, setMovies] = useState([]);

    //const fetchURL = "https://api.themoviedb/org/3/discover/tv?api_key=df7510bd7dd3fc3cf823106e7e473ecf&with_networks=213"

    //snippet of code which runs based on a specific condition.
    //runs when the row is loading
    //runs every time 'movies' changes

    //[url] indicates that useEffect() is dependent on this variable. Anytime the value of url changes, useEffect has to be updated. 

    useEffect(() => {
        fetchMovies();
      }, []);
    
    const fetchMovies = async () => {
        //the url will be replaced by the favourite movies from the database for the particular profile.
        // const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";
        // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;

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
            <div className="row">
                <h1>{title}</h1>
                <div className="row__posters">
                    {movies.map((movie) => (
                        <Link to="/profile"><img    //link needs to be changed to the profile details link
                        key={movie.id}
                        className="row__poster"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        />
                        <p className="movie__title">{movie.title}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      );
};

export default MovieRow;