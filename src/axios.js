import axios from "axios";

// Create an instance.
// Pass a base URL which will be concatenated with the other half of the URL based on the request.  

const instance = axios.create({
    baseURL : "https://api.themoviedb/org/3",
    // withCredentials: false,
    // headers: {
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
    // },
});

export default instance;