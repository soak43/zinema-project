import React, { useState, useEffect} from "react";
import MovieRow from "../Rows/movie-rows";
import { Link } from "react-router-dom";
import "./homepage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk } from "../services/auth-thunks";
import { findUserByIDThunk, findUserByFirstNameThunk, findUserByLastNameThunk, findUserByUsernameThunk } from "../services/user-thunks";
import axios from "axios";
import Favorites from "../Rows/favorite-movie-row";
import ProfileRows from "../Rows/profile-rows";
import { searchProfileThunk } from "../services/user-thunks";

function Homepage(){


    // let loggedInUser = users.find((u) => u._id === "1");

    const {currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    console.log("Profile = ", profile);
    const [following, setFollowing] = useState([]);
    const [favMovies,setFavMovies] = useState([]);
    const [loadingfollowing, setLoadingfollowing] = useState(true);
    const [loadingmovies, setLoadingmovies] = useState(true);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const url_comedy = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
    const url_horror = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`;
    const url_romantic = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`;

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    console.log("QUERY = ", query);

    const handleSearchMovies = () => {
        navigate("/zinema/search-results");
    };

    // const findUserOnFirstname = async (searchQuery) => {
    //     await dispatch(findUserByFirstNameThunk(searchQuery));
    // };

    // const findUserOnLastname = async (searchQuery) => {
    //     await dispatch(findUserByLastNameThunk(searchQuery));
    // };

    // const findUserOnUsername = async (searchQuery) => {
    //     await dispatch(findUserByUsernameThunk(searchQuery));
    // };


    const handleSearch = async () => {
        const searchQuery = query;

        const {payload} = await dispatch(searchProfileThunk(searchQuery));
        // profilesFetched.push(await findUserOnFirstname(searchQuery));
        // profilesFetched.push(await findUserOnLastname(searchQuery));
        // profilesFetched.push(await findUserOnUsername(searchQuery));
        console.log("Payload search profiles = ", payload);
        setResults(payload);
        console.log("Result = ",results);
        
    }

    const handleKeyPress = (e) => {
        console.log("Inside handleKeyPress");
        if (e.key === 'Enter' || e.key === 'Return') {
            console.log("Enter pressed");
          handleSearch();
        }
    };

    const findFollowingUser = async (profile) => {
        try {
          // console.log("State.user = ", state.user);
            if(profile.followingList === null){
              setFollowing(followingArray);
                return;
            }
            const followingArray = [];
            profile.followingList.map(async(element) => {
                const userID = element.user_id; 
                const {payload} = await dispatch(findUserByIDThunk(userID));
                followingArray.push(payload);
                setLoadingfollowing(false);
                setFollowing([...followingArray]);
            })
            //setFollowing(followingArray);
            console.log("following = ", following);
        } catch (error) {
            console.error(error);
            navigate("/zinema/login");
        }
    };

    const findFavouriteMovies = async (currentUser) => {
        try {
            if(currentUser.watchList === null){
                console.log("NULL watchlist");
                setLoadingmovies(false);
                return;
            }
            const favArray = [];
            currentUser.watchList.map(async (element) => {
                console.log("element.movie_id = ", element.movie_id);
                const movieID = element.movie_id; 
                console.log("MOVIE ID = ", movieID);
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
                console.log("Movie = ", movie.data);
                favArray.push(movie.data);
                setLoadingmovies(false);
            })
            setFavMovies(favArray);
        } catch(error) {
            console.error(error);
            navigate("/zinema/login");
        }
    };
   
    useEffect(() => {
        setTimeout(()=>{console.log("HELLO")}, 2000);
        const fetchData = async () => {
            try {
              await fetchProfile();

            } catch (error) {
              console.error(error);
              navigate("/zinema/login");
            }
        };

        const fetchProfile = async () => {
          try {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
            await findFollowingUser(payload);
            await findFavouriteMovies(payload);
            // if(currentUser !== null){
            //   await findFollowingUser();
            //   await findFollowers();
            //   await findFavouriteMovies();
            // }
            // console.log("Profile picture = ", profile.profilePicture);
          } catch (error) {
            console.error(error);
            navigate("/zinema/login");
          }
        };

        fetchData();
    },[dispatch]);


    if(currentUser === null){
        return(
        <div className="homepage_navigation">
            <h1 className="text-center">ZINEMA</h1>
            <div className="row ">
                {/* <div className="col-2">
                    <NavigationSidebar />
                </div> */}
                <div className="col-10">
                    <input onClick={handleSearchMovies} className="form-control mb-2 bg" type="text" placeholder="Search Movies or TV Shows" />
                    <div className="row">
                        <MovieRow title="Horror" url={url_horror} />
                    </div>
                    <div className="row">
                        <MovieRow title="Romantic" url={url_romantic}/>
                    </div>
                </div>
                </div>
            </div>
        );
        
    }else if(loadingfollowing || loadingmovies){
        return(
          <div>
            Loading...
          </div>
        );
    } else {

    return(
        <div className="homepage_navigation">
            <h1 className="text-center">ZINEMA</h1>
            <div className="row ">
                {/* <div className="col-2">
                    <NavigationSidebar />
                </div> */}
                <div className="col-10">
                    <input onClick={handleSearchMovies} className="form-control mb-2 bg" type="text" placeholder="Search Movies or TV Shows" />
                    <div className="row">
                        {favMovies && <Favorites fMovies={favMovies}/>}
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
                                    {results.map((userprofile) => (
                                        <Link to={`/userprofile/${userprofile._id}`}>
                                            <img 
                                            key={userprofile._id}
                                            className="row__profile rounded-circle"
                                            src={`../images/${userprofile.profilePicture}`}
                                            alt={userprofile.firstName} />
                                            <h4 className="profile__name">{userprofile.firstName}</h4>
                                        </Link>
                                    ))}
                                </div>
                        </div>
                        ) : 
                        (<div>
                            {/* <h1>Following</h1> */}
                            <div className="homepage__profiles">
                                {/* {following.map((userprofile) => (
                                    <Link to={`/userprofile/${userprofile._id}`}><img
                                    key={userprofile._id}
                                    className="row__profile rounded-circle"
                                    src={`../images/${userprofile.profilePicture}`}
                                    alt={userprofile.firstName}
                                    />
                                    <h4 className="profile__name">{userprofile.firstName}</h4>
                                    </Link>
                                ))} */}
                                <ProfileRows title={"Following"} profileData={following} />
                            </div>
                        </div>
                        )                    
                    }
                </div>
            </div>
        </div>
    );
    }
};

export default Homepage;