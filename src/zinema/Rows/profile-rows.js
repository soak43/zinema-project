import { Link } from "react-router-dom";
import "./Row.css";
import { useSelector } from "react-redux";

function ProfileRows({title, users}){

    // const {followingUsers} = useSelector((state) => state.user);
    // console.log("Following users = ", followingUsers);

    return (
        <div>
            {/* Following row*/}
            <div className="row">
                <h1>{title}</h1>
                <div className="row__posters">
                    {users && (users.map((profile) => (
                        <Link to={`/zinema/userprofile/${profile._id}`}><img width={10}
                        key={profile._id}
                        className="row__profile rounded-circle"
                        src={`/images/${profile.profilePicture}`}
                        alt={profile.firstName}
                        />
                        <h4 className="profile__name">{profile.firstName}</h4>
                        </Link> 
                    )))
                    // ) : (<h1>Search for Profiles to follow</h1>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileRows;