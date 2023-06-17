
import { Link } from "react-router-dom";
import "./row.css";

function ProfileRows({title, profileData}){
    return (
        <div>
            {/* Following row*/}
            <div className="row">
                <h1>{title}</h1>
                <div className="row__posters">
                    {profileData.map((profile) => (
                        <Link to={`/userprofile/${profile._id}`}><img width={10}
                        key={profile._id}
                        className="row__profile rounded-circle"
                        src={`/images/${profile.image}`}
                        alt={profile.name}
                        />
                        <h4 className="profile__name">{profile.firstname}</h4>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileRows;