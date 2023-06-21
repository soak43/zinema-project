import { createSlice } from "@reduxjs/toolkit";
import { fetchCommentsThunk, addCommentThunk } from "../services/movie-thunks";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    comments: [],
  },
  reducers: {},
  extraReducers: {
    [fetchCommentsThunk.fulfilled]: (state, { payload }) => {
      state.comments = payload;
    },
    [addCommentThunk.fulfilled]: (state, { payload }) => {
      state.comments.push(payload);
    },
  },
});

export default movieSlice.reducer;
