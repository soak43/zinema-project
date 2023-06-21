import { createAsyncThunk } from "@reduxjs/toolkit";
import * as movieService from "./movie-service";

export const addCommentThunk = createAsyncThunk(
  "movies/addComment",
  async (movieId, commentData) => {
    try {
      const response = await movieService.addComment(movieId, commentData);
      return response;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
      return error.message;
    }
  }
);

export const fetchCommentsThunk = createAsyncThunk(
  "movies/fetchComments",
  async (movieId) => {
    try {
      const response = await movieService.fetchComments(movieId);
      return response;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
      return error.message;
    }
  }
);
