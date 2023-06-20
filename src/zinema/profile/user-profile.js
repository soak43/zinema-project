//for users other than the logged in user.

import { useParams } from "react-router";
import users from "../users/users.json";
import NavigationSidebar from "../navigation-bar/navigationbar";
import ProfileRows from "../Rows/profile-rows";
import MovieRow from "../Rows/movie-rows";
import { useState } from "react";

function UserProfile(){

    const [follows, setFollows] = useState(true);

    const {profileId} = useParams();
    const user = users.find((u) => u._id === profileId);
    console.log("User = ",user);
    // const loggedInUser = users.find((u) => u._id === 1);


    // loggedInUser.following.indexOf({profileId}) >= 0 ? setFollows(true) : setFollows(false);


    const followingUsers = []
    user.following.map((p) => {
        const u = users.find((u) => u._id === p);
        followingUsers.push(u);
    })

    const followerUsers = []
    user.followers.map((p) => {
        const u = users.find((u) => u._id === p);
        followerUsers.push(u);
    })

    const handleFollow = () =>{
        setFollows(!follows);
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
                            <img width={200} src={`../images/${user.image}`} className="rounded-circle img-fluid"></img>
                        </div>
                        <div className="col-7 pt-5">
                                <h1> Profile </h1>
                                <h2 className = "text-left">{user.firstname} {user.lastname}</h2>
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
                    <MovieRow title="Favourites" url={url}/>
                    <ProfileRows title={"Following"} profileData={followingUsers}/>
                    <ProfileRows title={"Followers"} profileData={followerUsers}/>
                </div>
            </div>)}
        </div>
    );
};

export default UserProfile;
