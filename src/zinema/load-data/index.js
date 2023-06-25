import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { findUserByIDThunk } from "../services/user-thunks";
import axios from "axios";
import { useNavigate } from "react-router";
import { profileThunk } from "../services/auth-thunks";

function Loaddata(){

    const {currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    console.log("Profile = ", profile);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [favMovies,setFavMovies] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";

    useEffect(() => {
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
            localStorage.setItem('currentUser', JSON.stringify(payload));
            console.log("Profile picture = ", profile.profilePicture);
          } catch (error) {
            console.error(error);
            console.log("ERROR in profile");
            // navigate("/zinema/login");
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
                localStorage.setItem('followingList', JSON.stringify(followingArray));
                console.log("following = ", following);
            } catch (error) {
                console.error(error);
                console.log("ERROR in following");
                // navigate("/zinema/login");
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
                localStorage.setItem('followerList', JSON.stringify(followerArray));
                console.log("followers = ", followers);
            } catch (error) {
                console.error(error);
                console.log("ERROR in followers");
                // navigate("/zinema/login");
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
                localStorage.setItem('favMovies', JSON.stringify(favArray));
            } catch(error) {
                console.error(error);
                console.log("ERROR in fav movies");
                // navigate("/zinema/login");
            }
        };

        fetchData();  
    },[dispatch]);





}

export default Loaddata;