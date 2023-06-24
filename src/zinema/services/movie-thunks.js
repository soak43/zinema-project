import { createAsyncThunk } from "@reduxjs/toolkit";
import * as movieService from "./movie-service";


export const updateCommentThunk = createAsyncThunk(
  "movies/updateComment",
  async (commentData) => {
    try {
      console.log("inside updateCommentThunk");
      console.log("comment data in updateComment Thunk: ", commentData);
      console.log("movie id in updateComment thunk: ", commentData.movie_id);
      const response = await movieService.updateComment(commentData);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const createCommentThunk = createAsyncThunk(
  "movies/createComment",
  async (commentData) => {
    try {
      console.log("inside createCommentsThunk");
      console.log("comment data in create comments thunk: ", commentData)
      const response = await movieService.createComment(commentData);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const findCommentsThunk = createAsyncThunk(
  "movies/findComments",
  async (movieId) => {
    try {
      console.log("inside findCommentsThunk");
      const response = await movieService.findComments(movieId);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);
