import { createSlice } from "@reduxjs/toolkit";
import { findCommentsThunk, createCommentThunk, updateCommentThunk } from "../services/movie-thunks";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    comments: [],
    loading: false
  },
  reducers: {},
  extraReducers: {
    [findCommentsThunk.rejected]: (state, action) => {
      console.log("in the findComments function and it failed");
      state.loading = false
      state.error = action.error
    },
    [findCommentsThunk.pending]: (state, { payload }) => {
      console.log("in the findComments function and it's loading");
      state.loading = true;
      state.comments = [];
    },
    [findCommentsThunk.fulfilled]: (state, { payload }) => {
      console.log("in the findComments function of the movie-reducer method");
      state.loading = false;
      state.comments = payload;
    },
    [createCommentThunk.fulfilled]: (state, { payload }) => {
      console.log("in the createComment function of the movie-reducer method");
      state.loading = false;
      state.comments.push(payload);
    },
    [updateCommentThunk.fulfilled]: (state, { payload }) => {
      console.log("in the updateComment function of the movie-reducer method");
      state.loading = false;
      const i = state.comments.findIndex((t) => t._id === payload._id)
      state.comments[i] = { ...state.comments[i], ...payload }
    },
  },
});

export default movieSlice.reducer;
