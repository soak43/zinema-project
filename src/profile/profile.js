import Nav from "../nav";
import NavigationSidebar from "../navigation-bar/navigationbar";
import PrivateDetails from "./private-details";
import "./profile.css";
import users from "../users/users.json";
import Row from "../movie-rows/Row";
import requests from "../requests";

function Profile(){

    let loggedInUser = users.find((u) => u._id === 1);

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
                    <Row title="Favourites" url={requests.fetchNetflixOriginals}/>
                </div>
            </div>
        </div>
    );

}

export default Profile;