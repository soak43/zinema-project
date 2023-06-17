import logo from './logo.svg';
import './App.css';

import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import RegisterScreen from './register-screen';
import HelloPage from './hello-screen';
import Nav from './nav';
import LoginScreen from './login-screen';
import Zinema from './index-Zinema';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Zinema/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
