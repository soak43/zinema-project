//for users other than the logged in user.

import { useParams } from "react-router";
import users from "../users/users.json";
import NavigationSidebar from "../navigation-bar/navigationbar";
import ProfileRows from "../Rows/profile-rows";
import MovieRow from "../Rows/movie-rows";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { findUserByIDThunk } from "../services/user-thunks";
import Favorites from "../Rows/favorite-movie-row";
import { updateUserThunk } from "../services/auth-thunks";
import { updateAnyUserThunk } from "../services/user-thunks";
import {updateListThunk} from "../services/user-thunks";

function UserProfile(){

    const {profileId} = useParams();
    const [follows, setFollows] = useState(false);
    const {currentUser} = useSelector((state) => state.user);
    const [profile, setProfile] = useState({});
    const [loadingfollowers, setLoadingfollowers] = useState(true);
    const [loadingfollowing, setLoadingfollowing] = useState(true);
    const [loadingmovies, setLoadingmovies] = useState(true);

    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [favMovies,setFavMovies] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


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

  const findFollowers = async (profile) => {
      try {
          if(profile.followerList === null){
              setLoadingfollowers(false);
              return;
          }
          const followerArray = [];
          profile.followerList.map(async (element) => {
              const userID = element.user_id;
              const {payload} = await dispatch(findUserByIDThunk(userID));
              followerArray.push(payload);
              setLoadingfollowers(false);
              setFollowers([...followerArray]);
          })
          console.log("followers = ", followers);
      } catch (error) {
          console.error(error);
          navigate("/zinema/login");
      }
  };

  const findFavouriteMovies = async (profile) => {
      try {
          if(profile.watchList === null){
              console.log("NULL watchlist");
              setLoadingmovies(false);
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
              if(currentUser.followingList.find((e) => e.user_id === profileId)){
                setFollows(true);
              }
              await fetchProfile();

            } catch (error) {
              console.error(error);
              navigate("/zinema/login");
            }
        };

        const fetchProfile = async () => {
          try {
            const { payload } = await dispatch(findUserByIDThunk(profileId));
            setProfile(payload);
            await findFollowingUser(payload);
            await findFollowers(payload);
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

    const handleFollow = (follows) =>{
        if(follows){
            const updatedFollowingList = [...currentUser.followingList, { user_id: profileId }];
            console.log("Updates following list = ", updatedFollowingList);
            dispatch(updateUserThunk(/*{ user_id: profileId }*/updatedFollowingList));
            const updatedFollowerList = [...profile.followerList, { user_id: currentUser._id }];
            console.log("Updates follower list = ", updatedFollowerList);
            dispatch(updateAnyUserThunk({profileId, updatedFollowerList}));
        } 
        else {
            const updatedFollowingList = currentUser.followingList.filter(
                (element) => element.user_id !== profileId
            );
            console.log("Updates following list = ", updatedFollowingList);
            dispatch(updateUserThunk(/*{ user_id: profileId }*/updatedFollowingList));
            
              // Remove loggedInUser from user's followerList
            const updatedFollowerList = profile.followerList.filter(
                (element) => element.user_id !== currentUser._id
            );
            console.log("Updates follower list = ", updatedFollowerList);
            dispatch(updateAnyUserThunk({profileId, updatedFollowerList}));
        }
    }
    
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;

    if(loadingfollowers || loadingfollowing || loadingmovies){
      return(
        <div>
          Loading...
        </div>
      );
    }else{

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
                            <img width={200} src={`/images/${profile.profilePicture}`} className="rounded-circle img-fluid"></img>
                        </div>
                        <div className="col-7 pt-5">
                                <h1> Profile </h1>
                                <h2 className = "text-left">{profile.firstName} {profile.lastName}</h2>
                                {!follows && (
                                   <button className="btn btn-primary" onClick={() => { setFollows(true); handleFollow(true);}}>FOLLOW</button>
                                )}
                                 {follows && (
                                   <button className="btn btn-secondary" onClick={() => { setFollows(false); handleFollow(false);}}>FOLLOWING</button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            
            {follows && (<div className="row mt-4">
                <div className="col-10">
                    <Favorites fMovies={favMovies}/>
                    <ProfileRows title={"Following"} profileData={following}/>
                    <ProfileRows title={"Followers"} profileData={followers}/>
                </div>
            </div>)}
        </div>
    );
  }
};

export default UserProfile;
