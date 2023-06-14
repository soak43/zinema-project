import following from "../following/following.json";
import followers from "../following/followers.json";
import { Link } from "react-router-dom";
import "./row.css";

function ProfileRows(){
    return (
        <div>
            {/* Following row*/}
            <div className="row">
                <h1>Following</h1>
                <div className="row__posters">
                    {following.map((profile) => (
                        <Link to={`/profile/${profile._id}`}><img width={10}
                        key={profile._id}
                        className="row__profile rounded-circle"
                        src={`/images/${profile.image}`}
                        alt={profile.name}
                        />
                        <h4 className="profile__name">{profile.name}</h4>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Followers row*/}
            <div className="row">
                <h1>Followers</h1>
                <div className="row__posters">
                    {followers.map((profile) => (
                        <Link to={`/profile/${profile._id}`}><img width={10}
                        key={profile._id}
                        className="row__profile rounded-circle"
                        src={`/images/${profile.image}`}
                        alt={profile.name}
                        />
                        <h4 className="profile__name">{profile.name}</h4>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ProfileRows;