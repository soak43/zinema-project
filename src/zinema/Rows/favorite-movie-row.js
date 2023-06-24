import { useEffect, useSelector, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {profileThunk} from "../services/auth-thunks";
import { useNavigate } from "react-router-dom";

function Favorites({fMovies}){

  const favMovies = fMovies;
  console.log("Inside fav movies ROWS");
  console.log("Fav movies = ", favMovies);

  // const [favMovies, setFavMovies] = useState({fMovies});

  const navigate = useNavigate();

    const handleClick = () =>{
      navigate("/zinema/home");
    }

    return(
        <div>
            <div className="row">
                <h1>Favorite Movies</h1>
                {favMovies.length > 0 ? (<div className="row__posters">
                    {favMovies.map((movie) => (
                        <Link to={`/zinema/movie-content/${movie.id}`}><img  //links to movie content
                        key={movie.id}
                        className="row__poster"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        />
                        <p className="movie__title">{movie.title}</p>
                        </Link>
                    ))}
                </div>) : (<button className="btn btn-primary" onClick={handleClick}> Add favorites</button>)}
            </div>
        </div> 
    );
};

export default Favorites;