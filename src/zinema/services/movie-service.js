import axios from "axios";

const SERVER_API_URL = "http://localhost:4000/api";
const MOVIES_URL = `${SERVER_API_URL}/movies`;

const api = axios.create({ withCredentials: true });

export const addComment = async (movieId, commentData) => {
  try {
    const response = await api.post(`${MOVIES_URL}/${movieId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchComments = async (movieId) => {
  try {
    // might have to change this to post
    const response = await api.get(`${MOVIES_URL}/${movieId}/comments`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
