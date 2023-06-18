import axios from "axios";

// API url
const SERVER_API_URL = "";

// URL to Auth Controller
const USERS_URL = `${SERVER_API_URL}`;

// configure axios to support cookies
// for passing credentials
const api = axios.create({ withCredentials: true })

// Login Service function
// username could be phone or number
export const login = async ({ username, password}) => {
    const response = await api.post(`${USERS_URL}/login`, { username, password });
    const user = response.data;
    return user;
};

// Logout
export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};

// Profile
export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    return response;
};

// Update User
export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}/${user._id}`, user);
    return response.data;
};

// Register user
export const register = async ({ username, password, fName, lName, email, phoneNum, userPlan }) => {
    const response = await api.post(`${USERS_URL}/register`, { username, password, fName, lName, email, phoneNum, userPlan });
    const user = response.data;
    return user;
}