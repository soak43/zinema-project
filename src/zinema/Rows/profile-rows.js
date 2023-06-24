import { Link } from "react-router-dom";
import "./Row.css";

function ProfileRows({title, profileData}){
    return (
        <div>
            {/* Following row*/}
            <div className="row">
                <h1>{title}</h1>
                <div className="row__posters">
                    {profileData.length > 0 && profileData.map((profile) => (
                        <Link to={`/zinema/userprofile/${profile._id}`}><img width={10}
                        key={profile._id}
                        className="row__profile rounded-circle"
                        src={`/images/${profile.profilePicture}`}
                        alt={profile.firstName}
                        />
                        <h4 className="profile__name">{profile.firstName}</h4>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileRows;