// import logo from './logo.svg';
// import './App.css';
import Profile from "./profile/profile";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/profile"/>}/>
          <Route path="/profile/*" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
