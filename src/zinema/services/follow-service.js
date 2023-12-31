import axios from "axios";
const SERVER_API_URL = "https://zinema-backend.onrender.com/api" //"http://localhost:4000/api"
const USERS_URL = `${SERVER_API_URL}/users`;


const api = axios.create({ withCredentials: true });


export const updateFollow = async (followData) => {
  try {
    console.log("inside update follow services");
    console.log("update follow services data: ", followData);
    let username = followData.username;
    delete followData["username"];
    const response = await api.put(`${USERS_URL}/follow/${username}`, followData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

