import Nav from "../settings/nav";
import NavigationSidebar from "../navigation-bar/navigationbar";
import PrivateDetails from "./private-details";
import "./profile.css";
import users from "../users/users.json";
import MovieRow from "../Rows/movie-rows";
import ProfileRows from "../Rows/profile-rows";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { profileThunk } from "../services/auth-thunks";
import { findUserByIDThunk } from "../services/user-thunks";
import axios from "axios";
import Favorites from "../Rows/favorite-movie-row";
import Loaddata from "../load-data";
// import following from "../following/following.json";
// import followers from "../following/followers.json";
// import requests from "../requests";

function Profile(){

    const {currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    console.log("Profile = ", profile);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [favMovies,setFavMovies] = useState([]);

    const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Following list = ", profile.followingList);
    console.log("Follower list = ", profile.followerList);
    console.log("WATCH list = ", profile.watchList);

    profile.followingList.map((element) => {
        const userID = element.user_id;
        console.log("user id = ", userID);
        console.log(`someString/${userID}`);
        console.log("ID = ", element);
        console.log(`someString/${element}`);
    });

    // Loaddata();
    
    useEffect(() => {

      // const profile = JSON.parse(localStorage.getItem('currentUser'));
      // if (profile) {
      //   setProfile(profile);
      // }

      // const followingList = JSON.parse(localStorage.getItem('followingList'));
      // if (followingList) {
      //   setFollowing(followingList);
      // }

      // const followerList = JSON.parse(localStorage.getItem('followerList'));
      // if (followerList) {
      //   setFollowers(followerList);
      // }

      // const favMoviesList = JSON.parse(localStorage.getItem('favMovies'));
      // if (favMoviesList) {
      //   setFavMovies(favMoviesList);
      // }
        setTimeout(()=>{console.log("HELLO")}, 2000);
        const fetchData = async () => {
            try {
              await fetchProfile();
              await findFollowingUser();
              await findFollowers();
              await findFavouriteMovies();
            } catch (error) {
              console.error(error);
              navigate("/zinema/login");
            }
        };

        const fetchProfile = async () => {
          try {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
            console.log("Profile picture = ", profile.profilePicture);
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

        const findFollowers = async () => {
            try {
                if(profile.followerList === null){
                    return;
                }
                const followerArray = [];
                profile.followerList.map(async (element) => {
                    const userID = element.user_id;
                    const {payload} = await dispatch(findUserByIDThunk(userID));
                    followerArray.push(payload);
                })
                setFollowers(followerArray);
                console.log("followers = ", followers);
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






        // const findFollowingUser = async () => {
        //     try {
        //       if (profile.followingList === null) {
        //         return;
        //       }
          
        //       const followingArray = await Promise.all(profile.followingList.map(async (element) => {
        //         const userID = element.user_id;
        //         const { payload } = await dispatch(findUserByIDThunk(userID));
        //         return payload;
        //       }));
          
        //       setFollowing(followingArray);
        //       console.log("following =", following);
        //     } catch (error) {
        //       console.error(error);
        //       navigate("/zinema/login");
        //     }
        //   };
          

        // const findFollowers = async () => {
        //     try {
        //       if (profile.followerList === null) {
        //         return;
        //       }
          
        //       const followerArray = [];
        //       await Promise.all(profile.followerList.map(async (element) => {
        //         const userID = element.user_id;
        //         const { payload } = await dispatch(findUserByIDThunk(userID));
        //         followerArray.push(payload);
        //       }));
          
        //       setFollowers(followerArray);
        //       console.log("followers =", followers);
        //     } catch (error) {
        //       console.error(error);
        //       navigate("/zinema/login");
        //     }
        // };          

        // const findFavouriteMovies = async () => {
        //     try {
        //       if (profile.watchList === null) {
        //         console.log("NULL watchlist");
        //         return;
        //       }
          
        //       const favArray = await Promise.all(profile.watchList.map(async (element) => {
        //         console.log("element.movie_id =", element.movie_id);
        //         const movieID = element.movie_id;
        //         console.log("MOVIE ID =", movieID);
        //         const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
        //         console.log("Movie =", movie.data);
        //         return movie.data;
        //       }));
          
        //       setFavMovies(favArray);
        //     } catch (error) {
        //       console.error(error);
        //       navigate("/zinema/login");
        //     }
        // };
          

        // fetchProfile();
        // findFollowingUser();
        // findFollowers();
        // findFavouriteMovies();
        fetchData();  
    },[dispatch]);

    

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
                            <img width={200} src={`../images/${profile.profilePicture}`} className="rounded-circle img-fluid"></img>
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
                    <PrivateDetails user = {profile} />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-10">
                    {/* <MovieRow title={"Fav?"} url={url}/> */}
                    <Favorites fMovies={favMovies}/>
                    <ProfileRows title={"Following"} profileData={following}/>
                    <ProfileRows title={"Followers"} profileData={followers}/>
                </div>
            </div>
        </div>
    );

}

export default Profile;