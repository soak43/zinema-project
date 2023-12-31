import axios from "axios";
const SERVER_API_URL = "https://zinema-backend.onrender.com/api" //"http://localhost:4000/api"
const USERS_URL = `${SERVER_API_URL}/users`;


const api = axios.create({ withCredentials: true });


export const login = async ({ username, password }) => {
  const response = await api.post(`${USERS_URL}/login`, { username, password });
  const user = response.data;
  return user;
};
export const register = async ({ firstName, lastName, email, phoneNumber, username, password,  userType}) => {
  console.log("User type = ", userType);
  const response = await api.post(`${USERS_URL}/register`, { firstName, lastName, email, phoneNumber, username, password, userType});
  const user = response.data;
  return user;
};
export const logout = async () => {
  const response = await api.post(`${USERS_URL}/logout`);
  return response.data;
};
export const profile = async () => {
  const response = await api.post(`${USERS_URL}/profile`);
  console.log("USER in profile service = ", response.data);
  return response.data;
};
export const updateUser = async (user) => {
  const response = await api.put(`${USERS_URL}`, user);
  console.log("Response = ", response);
  console.log("Response.data = ", response.data);
  return response.data;
};
