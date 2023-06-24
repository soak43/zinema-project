// import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Zinema from './zinema';

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/zinema/" />} />
            <Route path="/zinema/*" element={<Zinema/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;