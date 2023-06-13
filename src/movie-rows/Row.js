import React, {useState, useEffect} from "react";
import instance from "../axios";
// import axios from "axios";

function Row({title, url}){

    const [movies, setMovies] = useState([]);

    const fetchURL = "https://api.themoviedb/org/3/discover/tv?api_key=df7510bd7dd3fc3cf823106e7e473ecf&with_networks=213"

    //snippet of code which runs based on a specific condition.
    //runs when the row is loading
    //runs every time 'movies' changes

    //[url] indicates that useEffect() is dependent on this variable. Anytime the value of url changes, useEffect has to be updated. 

    useEffect(() => {
        // if [], run once when the row loads and don't run again
        async function fetchData() {
            console.log("url = ",url);
            const request = await instance.get(url);
            console.log("request = ", request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [url]);


    return(
        <div>
            {/* Title */}
            Rows
            <h2>{title}</h2>

            {/* container -> posters inside containers */}


            
        </div>
    )
};

export default Row;