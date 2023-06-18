// import logo from './logo.svg';
import './App.css';
import Homepage from './homepage/homepage';
import Profile from "./profile/profile";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SearchResults from './search-results';
import UserProfile from './profile/user-profile';
import MovieContent from './movie-content';
import NavigationSidebar from './navigation-bar/navigationbar';
import authReducer from "./reducers/auth-reducer";
import { configureStore } from '@reduxjs/toolkit';
import RegisterScreen from './register-screen';
import LoginScreen from './login-screen';
import HelloPage from './hello-screen';
import { Provider } from 'react-redux';
import Settings from './settings';
import SettingsMain from './settings/settings';
import Billing from './settings/billing';
import Security from './settings/security';
import ViewCard from './settings/view-card';
import AddCard from './settings/add-card';
import PayBill from './settings/pay-bill';

const store = configureStore ({
  reducer: {
      user: authReducer
  }
})


function App() {
  return (
    <Provider store={store}>
    <div className='container'>
      <BrowserRouter>
      <div className='row'>
        <div className="col-2 mt-5">
          <NavigationSidebar />
        </div>
        <div className="col-10">
        <Routes>
          {/* <Route path="/" element={<Navigate to="/profile"/>}/> */}
          <Route path="/" element={<HelloPage/>}/>
          <Route path="/movie-content/:movieId" element={<MovieContent />} />
          <Route path="/search-results/*" element={<SearchResults />} />
          <Route path="/profile/*" element={<Profile/>}/>
          <Route path="/home/*" element={<Homepage />}/>
          <Route path="/userprofile/:profileId" element={<UserProfile />}/>
          <Route path="/register" element={<RegisterScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings-main" element={<SettingsMain />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/security" element={<Security />} />
          <Route path="/view-card"    element={<ViewCard />} />
          <Route path="/add-card" element={<AddCard />} />
          <Route path="/pay-bill"  element={<PayBill />} /> 
        </Routes>
        </div>
        </div>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
