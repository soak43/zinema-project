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

function UserProfile(){

    const {profileId} = useParams();
    const [follows, setFollows] = useState(true);
    const {currentUser} = useSelector((state) => state.user);
    const [loggedInUser, setLoggedInUser] = useState(currentUser);
    
    const {profileUser, followingUsers, followedUsers} = useSelector((state) => state.profile);
    const [user, setUser] = useState(profileUser);
    const [following, setFollowing] = useState(followingUsers);
    const [followers, setFollowers] = useState(followedUsers);
    const [favMovies,setFavMovies] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setTimeout(()=>{console.log("HELLO")}, 2000);
        const fetchData = async () => {
            try {
              await fetchProfile();
              console.log("USER = ", user);
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
            const {payload} = await dispatch(findUserByIDThunk(profileId));
            setUser(payload);
            // const { payload } = await dispatch(profileThunk());
            // setProfile(payload);
            console.log("Profile picture = ", user.profilePicture);
          } catch (error) {
            console.error(error);
            navigate("/zinema/login");
          }
        };

        const findFollowingUser = async () => {
            try {
              if (user.followingList === null) {
                return;
              }
          
              const followingArray = await Promise.all(user.followingList.map(async (element) => {
                const userID = element.user_id;
                const { payload } = await dispatch(findUserByIDThunk(userID));
                return payload;
              }));
          
              setFollowing(followingArray);
              console.log("following =", following);
            } catch (error) {
              console.error(error);
              navigate("/zinema/login");
            }
          };
          

        const findFollowers = async () => {
            try {
              if (user.followerList === null) {
                return;
              }
          
              const followerArray = [];
              await Promise.all(user.followerList.map(async (element) => {
                const userID = element.user_id;
                const { payload } = await dispatch(findUserByIDThunk(userID));
                followerArray.push(payload);
              }));
          
              setFollowers(followerArray);
              console.log("followers =", followers);
            } catch (error) {
              console.error(error);
              navigate("/zinema/login");
            }
        };          

        const findFavouriteMovies = async () => {
            try {
              if (user.watchList === null) {
                console.log("NULL watchlist");
                return;
              }
          
              const favArray = await Promise.all(user.watchList.map(async (element) => {
                console.log("element.movie_id =", element.movie_id);
                const movieID = element.movie_id;
                console.log("MOVIE ID =", movieID);
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
                console.log("Movie =", movie.data);
                return movie.data;
              }));
          
              setFavMovies(favArray);
            } catch (error) {
              console.error(error);
              navigate("/zinema/login");
            }
        };

        fetchData();  
    },[dispatch]);

    const handleFollow = () =>{
        setFollows(!follows);
        if(follows){
            const updatedFollowingList = [...currentUser.followingList, { user_id: profileId }];
            dispatch(updateUserThunk(updatedFollowingList));
            const updatedFollowerList = [...user.followerList, { user_id: loggedInUser._id }];
            dispatch(updateAnyUserThunk(profileId, updatedFollowerList));
        } 
        else {
            const updatedFollowingList = currentUser.followingList.filter(
                (element) => element.user_id !== profileId
            );
            dispatch(updateUserThunk(updatedFollowingList));
          
              // Remove loggedInUser from user's followerList
            const updatedFollowerList = user.followerList.filter(
                (element) => element.user_id !== loggedInUser._id
            );
              dispatch(updateAnyUserThunk(profileId, updatedFollowerList));
        }
    }
    
    const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;

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
                            <img width={200} src={`../images/${user.profilePicture}`} className="rounded-circle img-fluid"></img>
                        </div>
                        <div className="col-7 pt-5">
                                <h1> Profile </h1>
                                <h2 className = "text-left">{user.firstName} {user.lastName}</h2>
                                {!follows && (
                                   <button className="btn btn-primary" onClick={handleFollow}>FOLLOW</button>
                                )}
                                 {follows && (
                                   <button className="btn btn-secondary" onClick={handleFollow}>FOLLOWING</button>
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
};

export default UserProfile;
