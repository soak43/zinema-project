import React, {useState} from "react";
import NavigationSidebar from "../navigation-bar/navigationbar";
import MovieRow from "../Rows/movie-rows";
import { Link } from "react-router-dom";
import profiles from "../users/users.json";
import SearchProfileresults from "../profile/search-profile-result";
import "./homepage.css";
import users from "../users/users.json";

function Homepage(){


    let loggedInUser = users.find((u) => u._id === "1");
    const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";
    const url_comedy = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
    const url_horror = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`;
    const url_romantic = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`;

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const searchQuery = query;

        const filteredProfiles = profiles.filter(
        (profile) =>
            profile.firstname === searchQuery || profile.lastname === searchQuery || profile.username === searchQuery
        );
        console.log("filtered profiles = ",filteredProfiles);
        setResults(filteredProfiles);
        console.log("Result = ",results);
        // navigate('/profileresults');
        SearchProfileresults({filteredProfiles});
        // console.log("Results = ",results);
    }

    const handleKeyPress = (e) => {
        console.log("Inside handleKeyPress");
        if (e.key === 'Enter' || e.key === 'Return') {
            console.log("Enter pressed");
          handleSearch();
        }
    };

    const followingUsers = []
    loggedInUser.following.map((p) => {
        const u = users.find((u) => u._id === p);
        followingUsers.push(u);
    })

    return(
        <div className="homepage_navigation bg-dark text-light">
            <h1 className="text-center">ZINEMA</h1>
            <div className="row ">
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
                    <div className="row search__profiles">
                        <input onChange={(e)=>setQuery(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} className="form-control" type="text" placeholder="Search Profiles"/>
                    </div>
                    {results.length > 0 ? (
                        <div>
                            <h1>Search Results</h1>
                                <div className="homepage__profiles">
                                    {results.map((profile) => (
                                        <Link to={`/userprofile/${profile._id}`}>
                                            <img 
                                            key={profile._id}
                                            className="row__profile rounded-circle"
                                            src={`/images/${profile.image}`}
                                            alt={profile.firstname} />
                                            <h4 className="profile__name">{profile.firstname}</h4>
                                        </Link>
                                    ))}
                                </div>
                        </div>
                        ) : 
                        (<div>
                            <h1>Following</h1>
                            <div className="homepage__profiles">
                                {followingUsers.map((profile) => (
                                    <Link to={`/userprofile/${profile._id}`}><img
                                    key={profile._id}
                                    className="row__profile rounded-circle"
                                    src={`/images/${profile.image}`}
                                    alt={profile.firstname}
                                    />
                                    <h4 className="profile__name">{profile.firstname}</h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        )                    
                    }
                </div>
            </div>
        </div>
    );
};

export default Homepage;