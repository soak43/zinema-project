import SearchResults from "./search-results";
import MovieContent from "./movie-content";
import Homepage from "./homepage/homepage";
import UserProfile from "./profile/user-profile";
import RegisterScreen from "./register-screen";
import LoginScreen from "./login-screen";
import Settings from "./settings";
import Security from "./settings/security";
import AddCard from "./settings/add-card";
import PayBill from "./settings/pay-bill";
import ViewCard from "./settings/view-card";
import Billing from "./settings/billing";
import SettingsMain from "./settings/settings";
import NavigationSidebar from "./navigation-bar/navigationbar";
import { Route, Routes } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./reducers/auth-reducer";
import movieReducer from "./reducers/movie-reducer";
import Profile from "./profile/profile";
import HelloPage from "./hello-screen";
import profileReducer from "./reducers/profile-reducer";

const store = configureStore({
  reducer: {
    user: authReducer,
    movie: movieReducer,
    profile: profileReducer
  }
})


function Zinema() {
  return (
    <Provider store={store}>
      <div className='container'>
        <div className='row'>
          <div className="col-2 mt-5">
            <NavigationSidebar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" element={<HelloPage />} />
              <Route path="/movie-content/:movieId" element={<MovieContent />} />
              <Route path="/search-results/*" element={<SearchResults />} />
              <Route path="/profile/userprofile/:profileId" element={<UserProfile />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/userprofile/:profileId" element={<UserProfile />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings-main" element={<SettingsMain />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/security" element={<Security />} />
              <Route path="/view-card" element={<ViewCard />} />
              <Route path="/add-card" element={<AddCard />} />
              <Route path="/pay-bill" element={<PayBill />} />
            </Routes>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default Zinema;
