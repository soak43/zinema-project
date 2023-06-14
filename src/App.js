// import logo from './logo.svg';
import './App.css';
import Homepage from './homepage/homepage';
import Profile from "./profile/profile";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


function App() {
  return (
    <div className="bg-dark text-light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/profile"/>}/>
          <Route path="/profile/*" element={<Profile/>}/>
          <Route path="/home/*" element={<Homepage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
