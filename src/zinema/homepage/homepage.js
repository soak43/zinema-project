import React, { useState, useEffect} from "react";
import MovieRow from "../Rows/movie-rows";
import { Link } from "react-router-dom";
import "./homepage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk } from "../services/auth-thunks";
import { findUserByIDThunk } from "../services/user-thunks";
import axios from "axios";
import Favorites from "../Rows/favorite-movie-row";

function Homepage(){


    // let loggedInUser = users.find((u) => u._id === "1");

    const {currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    console.log("Profile = ", profile);
    const [following, setFollowing] = useState([]);
    const [favMovies,setFavMovies] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const url_comedy = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
    const url_horror = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`;
    const url_romantic = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`;

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    console.log("QUERY = ", query);

    // const handleSearch = () => {
    //     const searchQuery = query;

    //     const filteredProfiles = profiles.filter(
    //     (profile) =>
    //         profile.firstname === searchQuery || profile.lastname === searchQuery || profile.username === searchQuery
    //     );
    //     console.log("filtered profiles = ",filteredProfiles);
    //     setResults(filteredProfiles);
    //     console.log("Result = ",results);
    //     // navigate('/profileresults');
    //     // console.log("Results = ",results);
    // }

    // const handleKeyPress = (e) => {
    //     console.log("Inside handleKeyPress");
    //     if (e.key === 'Enter' || e.key === 'Return') {
    //         console.log("Enter pressed");
    //       handleSearch();
    //     }
       
    // };

    const handleSearchMovies = () => {
        navigate("/zinema/search-results");
    }

   
    useEffect(() => {
        setTimeout(()=>{console.log("HELLO")}, 2000);
        const fetchProfile = async () => {
          try {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
            // console.log("Profile picture = ", profile.profilePicture);
          } catch (error) {
            console.error(error);
            navigate("/zinema/login");
          }
        };

        const findFollowingUser = async () => {
            try {
                if(profile.followingList === null){
                    return;
                }
                const followingArray = [];
                profile.followingList.map(async(element) => {
                    const userID = element.user_id; 
                    const {payload} = await dispatch(findUserByIDThunk(userID));
                    followingArray.push(payload);
                })
                setFollowing(followingArray);
                console.log("following = ", following);
            } catch (error) {
                console.error(error);
                navigate("/zinema/login");
            }
        };

        const findFavouriteMovies = async () => {
            try {
                if(profile.watchList === null){
                    console.log("NULL watchlist");
                    return;
                }
                const favArray = [];
                profile.watchList.map(async (element) => {
                    console.log("element.movie_id = ", element.movie_id);
                    const movieID = element.movie_id; 
                    console.log("MOVIE ID = ", movieID);
                    const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
                    console.log("Movie = ", movie.data);
                    favArray.push(movie.data);
                })
                setFavMovies(favArray);
            } catch(error) {
                console.error(error);
                navigate("/zinema/login");
            }
        };

        fetchProfile();
        findFollowingUser();
        findFavouriteMovies();
    },[dispatch]);

    // useEffect(() => {
    //     setTimeout(()=>{console.log("HELLO")}, 2000);
    //     const fetchData = async () => {
    //         try {
    //           await fetchProfile();
    //           await findFollowingUser();
    //           await findFavouriteMovies();
    //         } catch (error) {
    //           console.error(error);
    //           navigate("/zinema/login");
    //         }
    //     };

    //     const fetchProfile = async () => {
    //       try {
    //         const { payload } = await dispatch(profileThunk());
    //         setProfile(payload);
    //         console.log("Profile picture = ", profile.profilePicture);
    //       } catch (error) {
    //         console.error(error);
    //         navigate("/zinema/login");
    //       }
    //     };

    //     const findFollowingUser = async () => {
    //         try {
    //           if (profile.followingList === null) {
    //             return;
    //           }
          
    //           const followingArray = await Promise.all(profile.followingList.map(async (element) => {
    //             const userID = element.user_id;
    //             const { payload } = await dispatch(findUserByIDThunk(userID));
    //             return payload;
    //           }));
          
    //           setFollowing(followingArray);
    //           console.log("following =", following);
    //         } catch (error) {
    //           console.error(error);
    //           navigate("/zinema/login");
    //         }
    //       };

    //     const findFavouriteMovies = async () => {
    //         try {
    //           if (profile.watchList === null) {
    //             console.log("NULL watchlist");
    //             return;
    //           }
          
    //           const favArray = await Promise.all(profile.watchList.map(async (element) => {
    //             console.log("element.movie_id =", element.movie_id);
    //             const movieID = element.movie_id;
    //             console.log("MOVIE ID =", movieID);
    //             const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
    //             console.log("Movie =", movie.data);
    //             return movie.data;
    //           }));
          
    //           setFavMovies(favArray);
    //         } catch (error) {
    //           console.error(error);
    //           navigate("/zinema/login");
    //         }
    //     };
    //     fetchData();  
    // },[]);



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
                        <Favorites fMovies={favMovies}/>
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
                        <input onChange={(e)=>setQuery(e.target.value)} /*onKeyDown={(e) => handleKeyPress(e)}*/ className="form-control" type="text" placeholder="Search Profiles"/>
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
                            <h1>Following</h1>
                            <div className="homepage__profiles">
                                {following.map((userprofile) => (
                                    <Link to={`/userprofile/${userprofile._id}`}><img
                                    key={userprofile._id}
                                    className="row__profile rounded-circle"
                                    src={`../images/${userprofile.profilePicture}`}
                                    alt={userprofile.firstName}
                                    />
                                    <h4 className="profile__name">{userprofile.firstName}</h4>
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