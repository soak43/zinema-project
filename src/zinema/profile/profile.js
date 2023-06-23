import PrivateDetails from "./private-details";
import "./profile.css";
import users from "../users/users.json";
import MovieRow from "../Rows/movie-rows";
import ProfileRows from "../Rows/profile-rows";
import { useSelector } from "react-redux";
import { findUserByIDThunk } from "../services/user-thunk";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { profileThunk } from "../services/auth-thunks";
// import {findFollowingThunk} from "../services/user-thunk";

// import { Link } from "react-router-dom";
import axios from "axios";
import Favorites from "../Rows/favorite-movie-row";
import { useNavigate } from "react-router";
import { faV } from "@fortawesome/free-solid-svg-icons";

function Profile(){

    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);

    if(currentUser !== null){
        console.log("currentUser.followingList = ", currentUser.followingList);
    }
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [favMovies,setFavMovies] = useState([]);

    console.log("current user = ", currentUser);
    // console.log("followingList =  ", currentUser.followingList);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;

    // useEffect(() => {
    //     async function loadProfile() {
    //         const {payload} = await dispatch(profileThunk());
    //         setProfile(payload);
    //     }
    //     loadProfile();
    // },[dispatch]);


    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const { payload } = dispatch(profileThunk());
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
                currentUser.followingList.map((id) => {
                    const {payload} = dispatch(findUserByIDThunk(id));
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
                currentUser.followerList.map((id) => {
                    const {payload} = dispatch(findUserByIDThunk(id));
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
        // };

        fetchProfile();
        findFollowingUser();
        findFollowers();
        // findFavouriteMovies();
    },[]);

    // const followingArray = [];
    // useEffect(() => {
    //     async function followingUsers() {
    //         if(profile){
    //             profile.followingList.map(async (p) => {
    //                 const {payload} = await dispatch(findUserByIDThunk(p));
    //                 followingArray.push(payload);
    //             })
    //             console.log("following users = ", followingArray);
    //         }
    //     }
    //     followingUsers();
    //     setFollowing(followingArray);
    // },[dispatch]);

    // const followerArray = [];
    // useEffect(() => {
    //     async function followerUsers() {
    //         if(profile){
    //             profile.followerList.map(async (p) => {
    //                 const {payload} = await dispatch(findUserByIDThunk(p));
    //                 followerArray.push(payload);
    //             })
    //             console.log("follower users = ", followerArray);
    //         }
    //     }
    //     followerUsers();
    //     setFollowers(followerArray);
    // },[dispatch]);


    // const movies = [];
    // useEffect(() => {
    //     if(profile.watchList === null){
    //         return;
    //     }
    //     async function findFavMovies() {
    //         profile.watchList.map(async (movieId) => {
    //             const {payload} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    //             movies.push(payload);
    //         })
    //         console.log("movies = ", movies);
    //   }
    //   findFavMovies();
    //   setFavMovies(movies);
    // },[]);


    return(
        <div>
            <h1>Profile</h1>
            <div className = "row">
                {/* <div className="col-2">
                    <NavigationSidebar />
                </div> */}
                <div className="col-10">
                    <div className="row">
                        <div className="col-3">
                            <img width={200} src={`../../images/${profile.profilePicture}`} className="rounded-circle img-fluid"></img>
                        </div>
                        <div className="col-7 pt-5">
                                <h1> Profile </h1>
                                <h2 className = "text-left">{profile.firstName} {profile.lastName}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-10">
                    <PrivateDetails/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-10">
                    {/* <MovieRow title="Favourites" url={url}/> */}
                    <Favorites fMovies={favMovies}/>
                    <ProfileRows title={"Following"} users={following}/>
                    <ProfileRows title={"Followers"} users={followers}/>
                </div>
            </div>
        </div>
    );

}

export default Profile;