import axios from "axios";
const SERVER_API_URL = "http://localhost:4000/api"
const USERS_URL = `${SERVER_API_URL}/users`;

export const findFollowing = async ({followingList}) => {
    console.log("Inside find following service");
    console.log("API === ", `${USERS_URL}/followinglist`);
    const response = await axios.post(`${USERS_URL}/followinglist`, {followingList});
    console.log("Response inside service = ", response.data);
    return response.data;
};

export const findUserById = async ({ uid }) => {
    console.log("Inside user service");
    console.log("uid = ", {uid});
    console.log(uid);
    console.log("API = ", `${USERS_URL}/${uid}`);
    const response = await axios.get(`${USERS_URL}/${uid}`);
    console.log("service response = ",response.data);
    const user = response.data;
    return user;
};

export const findUserByFirstName = async ({ firstName }) => {
    const response = await axios.get(`${USERS_URL}/firstname/${firstName}`);
    const user = response.data;
    return user;
};

export const findUserByLastName = async ({ lastName }) => {
    const response = await axios.get(`${USERS_URL}/lastname/${lastName}`);
    const user = response.data;
    return user;
};


export const findUserByUsername = async ({ username }) => {
    const response = await axios.get(`${USERS_URL}/username/${username}`);
    const user = response.data;
    return user;
};

// app.get('/api/users/:uid', findUserById);