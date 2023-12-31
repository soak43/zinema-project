import axios from "axios";
const SERVER_API_URL = "https://zinema-backend.onrender.com/api" //"http://localhost:4000/api"
const USERS_URL = `${SERVER_API_URL}/users/movies`;


const api = axios.create({ withCredentials: true });


export const updateFavorites = async (favoriteData) => {
  try {
    console.log("inside update favorites services");
    console.log("update favorites services data: ", favoriteData);
    let username = favoriteData.username;
    delete favoriteData["username"];
    const response = await api.put(`${USERS_URL}/favorites/${username}`, favoriteData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const findFavorites = async (favoriteData) => {
  try {
    console.log("inside find favorites services");
    console.log("find favorites services data: ", favoriteData);
    let username = favoriteData.username;
    delete favoriteData["username"];
    const response = await api.put(`${USERS_URL}/favorites/${username}`, favoriteData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
