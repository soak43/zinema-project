import Nav from "../nav";
import NavigationSidebar from "../navigation-bar/navigationbar";
import PrivateDetails from "./private-details";
import "./profile.css";
import users from "../users/users.json";
import MovieRow from "../Rows/movie-rows";
import ProfileRows from "../Rows/profile-rows";
// import following from "../following/following.json";
// import followers from "../following/followers.json";
// import requests from "../requests";

function Profile(userProfile){

    let loggedInUser = users.find((u) => u._id === "1");
    const API_KEY = "df7510bd7dd3fc3cf823106e7e473ecf";
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
    
    const followingUsers = []
    loggedInUser.following.map((p) => {
        const u = users.find((u) => u._id === p);
        followingUsers.push(u);
    })

    const followerUsers = []
    loggedInUser.followers.map((p) => {
        const u = users.find((u) => u._id === p);
        followerUsers.push(u);
    })

    return(
        <div>
            <h1>Profile</h1>
            <div className = "row">
                <div className="col-2">
                    <NavigationSidebar />
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-3">
                            <img width={200} src={`../images/${loggedInUser.image}`} className="rounded-circle img-fluid"></img>
                        </div>
                        <div className="col-7 pt-5">
                                <h1> Profile </h1>
                                <h2 className = "text-left">{loggedInUser.firstname} {loggedInUser.lastname}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-2"></div>
                <div className="col-10">
                    <PrivateDetails user = {loggedInUser} />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-2"></div>
                <div className="col-10">
                    <MovieRow title="Favourites" url={url}/>
                    <ProfileRows title={"Following"} profileData={followingUsers}/>
                    <ProfileRows title={"Followers"} profileData={followerUsers}/>
                </div>
            </div>
        </div>
    );

}

export default Profile;