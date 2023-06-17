import { Routes, Route } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import authReducer from "./reducers/auth-reducer";

import Nav from "./nav";
import HelloPage from "./hello-screen";
import RegisterScreen from "./register-screen";
import LoginScreen from "./login-screen";


const store = configureStore ({
    reducer: {
        user: authReducer
    }
})

const Zinema = () => {
    return(
        <Provider store={store}>
            <div className='w-auto text-white bg-dark' style={{
                    height: `100vh`
                }}>
                <Nav/>
                <Routes>
                    <Route path="" element={<HelloPage/>}/>
                    <Route path="/register" element={<RegisterScreen/>}/>
                    <Route path="/login" element={<LoginScreen/>}/>
                </Routes>
            </div>
        </Provider>
    )
    

}

export default Zinema