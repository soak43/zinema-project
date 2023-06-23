import React, {useState} from "react";
// import NavigationSidebar from "../navigation-bar/navigationbar";
import MovieRow from "../Rows/movie-rows";
import { Link } from "react-router-dom";
// import profiles from "../users/users.json";
import "./homepage.css";
import users from "../users/users.json";
import { useNavigate } from "react-router-dom";
import { findUserByFirstNameThunk, findUserByLastNameThunk, findUserByUsernameThunk } from "../services/user-thunk";
import { useDispatch ,useSelector} from "react-redux";
import {findUserByIDThunk} from "../services/user-thunk";
import { useEffect } from "react";
import { profileThunk } from "../services/auth-thunks";
import axios from "axios";


function Homepage(){


    // const {currentUser} = useSelector((state) => state.user);
    // const {profileUser, followingUsers, followedUsers} = useSelector((state) => state.profile);

    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [favMovies,setFavMovies] = useState([]);

    console.log("Current user = ", currentUser);
    // const [profile, setProfile] = useState(currentUser);
    // const [following, setFollowing] = useState(followingUsers);
    // console.log("Following = ", following);

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const url_comedy = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
    const url_horror = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`;
    const url_romantic = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`;

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
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
                if(currentUser.followingList === null){
                    return;
                }
                const followingArray = [];
                currentUser.followingList.map(async (id) => {
                    const {payload} = await dispatch(findUserByIDThunk(id));
                    followingArray.push(payload);
                })
                setFollowing(followingArray);
            } catch (error) {
                console.error(error);
                navigate("/zinema/login");
            }
        };

        const findFollowers = async () => {
            try {
                if(currentUser.followerList === null){
                    return;
                }
                const followerArray = [];
                currentUser.followerList.map(async (id) => {
                    const {payload} = await dispatch(findUserByIDThunk(id));
                    followerArray.push(payload);
                })
                setFollowers(followerArray);
            } catch (error) {
                console.error(error);
                navigate("/zinema/login");
            }
        };

        // const findFavouriteMovies = async () => {
        //     try {
        //         if(currentUser.watchList === null){
        //             return;
        //         }
        //         const favArray = [];
        //         currentUser.watchList.map(async(movieID) => {
        //             const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
        //             favArray.push(movie);
        //         })
        //         setFavMovies(favArray);
        //     } catch(error) {
        //         console.error(error);
        //         navigate("/zinema/login");
        //     }
        // }

        fetchProfile();
        findFollowingUser();
        findFollowers();
        // findFavouriteMovies();
    },[]);


    const handleSearch = () => {
        const searchQuery = query;

        let filteredProfiles = [];

        filteredProfiles.push(dispatch(findUserByFirstNameThunk(searchQuery)));
        filteredProfiles.push(dispatch(findUserByLastNameThunk(searchQuery)));
        filteredProfiles.push(dispatch(findUserByUsernameThunk(searchQuery)));

        setResults(filteredProfiles);

        // const filteredProfiles = profiles.filter(
        // (profile) =>
        //     profile.firstname === searchQuery || profile.lastname === searchQuery || profile.username === searchQuery
        // );
        // console.log("filtered profiles = ",filteredProfiles);
        // setResults(filteredProfiles);
        // console.log("Result = ",results);
        // navigate('/profileresults');
        // console.log("Results = ",results);
    }

    // const followingArray = [];
    // useEffect(() => {
    //     async function followingUsers() {
    //         profile.followingList.map(async (p) => {
    //             const {payload} = await dispatch(findUserByIDThunk(p));
    //             followingArray.push(payload);
    //         })
    //         console.log("following users = ", followingArray);
    //     }
    //     followingUsers();
    //     setFollowing(followingArray);
    // },[dispatch]);


    const handleKeyPress = (e) => {
        console.log("Inside handleKeyPress");
        if (e.key === 'Enter' || e.key === 'Return') {
            console.log("Enter pressed");
          handleSearch();
        }
       
    };

    const handleSearchMovies = () => {
        navigate("/zinema/search-results");
    }

    // const followingUsers = []
    // loggedInUser.following.map((p) => {
    //     const u = users.find((u) => findUserByIDThunk(p));
    //     followingUsers.push(u);
    // })

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
                                {following.map((profile) => (
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