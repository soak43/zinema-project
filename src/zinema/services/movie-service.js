import axios from "axios";

const SERVER_API_URL = "https://zinema-backend.onrender.com/api" //"http://localhost:4000/api";
const MOVIES_URL = `${SERVER_API_URL}/movies/comments`;

const api = axios.create({ withCredentials: true });

export const createComment = async (commentData) => {
  try {
    console.log("in the createComment of movie services")
    console.log("comment data in create comment service: ", commentData)
    const response = await api.post(`${MOVIES_URL}`, commentData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateComment = async (commentData) => {
  try {
    console.log("in the updateComment of movie services")
    console.log("movie id of commentData: ", commentData.movie_id);
    let movieId = commentData.movie_id;
    delete commentData["movie_id"];
    const response = await api.put(`${MOVIES_URL}/${movieId}`, commentData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findComments = async (movieId) => {
  try {
    // might have to change this to post
    console.log("in the findComments of movie services")
    const response = await api.get(`${MOVIES_URL}/${movieId}`);
    console.log("response data:", `${MOVIES_URL}/${movieId}`)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
