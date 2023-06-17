// import logo from './logo.svg';
import './App.css';
import Homepage from './homepage/homepage';
import Profile from "./profile/profile";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SearchProfileresults from './profile/search-profile-result';
import UserProfile from './profile/user-profile';


function App() {
  return (
    <div className="bg-dark text-light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/profile"/>}/>
          <Route path="/profile/*" element={<Profile/>}/>
          <Route path="/home/*" element={<Homepage />}/>
          <Route path="/profileresults" element={<SearchProfileresults/>}/>
          <Route path="/userprofile/:profileId" element={<UserProfile />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
