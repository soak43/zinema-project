import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk, profileThunk } from "../services/auth-thunks";

function ImageSelectionPage() {
  const images = [
    "default-profile-picture.png",
    "profilepic1.jpeg",
    "profilepic2.jpeg",
    "profilepic3.png",
    "profilepic4.jpeg",
    // "../images/wd.avif"
  ];

  const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = async (image) => {
        const updatedProfile = { ...profile, profilePicture: image };
        await dispatch(updateUserThunk(updatedProfile));
        setProfile(updatedProfile);
        navigate("/zinema/settings-main");
      };
    useEffect(() => {
        async function fetchData() {	
            const { payload } = await dispatch(profileThunk());	
            setProfile(payload);	
          }	
          fetchData();	
        }, [dispatch]);
  return (
    <>
    <h1>Select Profile Picture</h1>
    <div className="image-container">
      {images.map((image, index) => (
        <img
          key={index}
          className={`wd-profile-image ${selectedImage === image ? "selected" : ""}`}
          src={`/images/${image}`}
          // src={image}
          alt={`Profile Image ${index}`}
          onClick={() => save(image)}
        />
      ))}
    </div>
    </>
  );
}

export default ImageSelectionPage;