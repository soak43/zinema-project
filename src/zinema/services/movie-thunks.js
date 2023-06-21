import { createAsyncThunk } from "@reduxjs/toolkit";
import * as movieService from "./movie-service";


export const updateCommentThunk = createAsyncThunk(
  "movies/updateComment",
  async (movieId, commentData) => {
    try {
      console.log("inside updateCommentThunk");
      const response = await movieService.updateComment(movieId, commentData);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const createCommentThunk = createAsyncThunk(
  "movies/createComment",
  async (movieId, commentData) => {
    try {
      console.log("inside createCommentsThunk");
      const response = await movieService.createComment(movieId, commentData);
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
