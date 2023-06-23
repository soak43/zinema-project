import { useParams } from "react-router";
import users from "../users/users.json";
import ProfileRows from "../Rows/profile-rows";
import MovieRow from "../Rows/movie-rows";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {findUserByIDThunk} from "../services/user-thunk";
import axios from "axios";
import Favorites from "../Rows/favorite-movie-row";
import { updateUserThunk } from "../services/auth-thunks";


function UserProfile(){

    const {profileId} = useParams();

    // const [user, setUser] = useState({});

    const [follows, setFollows] = useState(true);
    // const [following, setFollowing] = useState({});
    // const [followers, setFollowers] = useState({});
    // const [favMovies,setFavMovies] = useState([]);

    const {currentUser} = useSelector((state) => state.user);
    const [loggedInUser, setLoggedInUser] = useState(currentUser);

    const {profileUser, followingUsers, followedUsers} = useSelector((state) => state.profile);
    const [user, setUser] = useState(profileUser);
    const [following, setFollowing] = useState(followingUsers);
    const [followers, setFollowers] = useState(followedUsers);
    const [favMovies,setFavMovies] = useState([]);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        async function loadProfile() {
            const {payload} = await dispatch(findUserByIDThunk(profileId));
            setUser(payload);
        }
        loadProfile();
    },[dispatch]);

    const followingArray = [];
    useEffect(() => {
        async function followingUsers() {
            user.followingList.map(async (p) => {
                const {payload} = await dispatch(findUserByIDThunk(p));
                followingArray.push(payload);
            })
            console.log("following users = ", followingArray);
        }
        followingUsers();
        setFollowing(followingArray);
    },[dispatch]);

    const followerArray = [];
    useEffect(() => {
        async function followerUsers() {
            user.followerList.map(async (p) => {
                const {payload} = await dispatch(findUserByIDThunk(p));
                followerArray.push(payload);
            })
            console.log("follower users = ", followerArray);
        }
        followerUsers();
        setFollowers(followerArray);
    },[dispatch]);
    

    // const movies = [];
    // useEffect(() => {
    //     if(user.watchList === null){
    //         return;
    //     }
    //   async function findFavMovies() {
    //     user.watchList.map(async (movieId) => {
    //           const {payload} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    //           movies.push(payload);
    //       })
    //       console.log("movies = ", movies);
    //   }
    //   findFavMovies();
    //   setFavMovies(movies);
    // },[]);



    const handleFollow = () =>{
        setFollows(!follows);
        console.log("Current user = ", loggedInUser);
        if(follows){
            loggedInUser.followingList.push(profileId);
        }else{
            const newFollowing = loggedInUser.followingList.filter((ids) => ids !== profileId);
            loggedInUser.followerList = newFollowing;
        }
        dispatch(updateUserThunk(loggedInUser));
    }
    
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
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
                            <img width={200} src={`../../images/${user.profilePicture}`} className="rounded-circle img-fluid"></img>
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
                    {/* <Favorites fMovies={favMovies}/> */}
                    {following && (<ProfileRows title={"Following"} users={following}/>)}
                    {followers && (<ProfileRows title={"Followers"} users={followers}/>)}
                    {/* <ProfileRows title={"Followers"} users={followers}/> */}
                </div>
            </div>)}
        </div>
    );
};

export default UserProfile;
