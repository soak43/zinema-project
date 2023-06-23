import { createSlice, current } from "@reduxjs/toolkit";
import { findCommentsThunk, createCommentThunk, updateCommentThunk } from "../services/movie-thunks";
const initialState = {
  //comments: [],
  comments: null,
  loading: false
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: {
    [findCommentsThunk.rejected]: (state, action) => {
      console.log("in the findComments function and it failed");
      state.loading = false
      state.error = action.error
    },
    [findCommentsThunk.pending]: (state, { payload }) => {
      console.log("in the findComments function and it's loading");
      state.loading = true;
      state.comments = null;
      // state.comments = [];
    },
    [findCommentsThunk.fulfilled]: (state, { payload }) => {
      console.log("in the findComments function of the movie-reducer method");
      console.log("find comments reducer payload data: ", payload)
      state.loading = false;
      state.comments = payload;
    },
    [createCommentThunk.fulfilled]: (state, { payload }) => {
      // state.comments = []
      console.log("in the createComment function of the movie-reducer method");
      console.log("create comment payload: ", payload);
      console.log("state comments: ", state.comments)
      console.log("state loading ", state.loading)
      state.loading = false;
      // state.comments.push(payload);
      state.comments = payload;
    },
    [updateCommentThunk.fulfilled]: (state, { payload }) => {
      console.log("in the updateComment function of the movie-reducer method");
      console.log("update comment reducer payload: ", payload);
      console.log("update comment thunk state: ", state.comments);
      console.log("state before: ", current(state))
      state.loading = false;
      // const updatedArray = Array.from(state.comments);
      // const i = updatedArray.findIndex((t) => t._id === payload._id);
      // updatedArray[i] = { ...updatedArray[i], ...payload };
      // state.comments = updatedArray;

      // const i = state.comments.findIndex((t) => t._id === payload._id);
      state.comments = { ...state.comments, ...payload };
    }
  },
  reducers: {}
});

export default movieSlice.reducer;
