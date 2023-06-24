import { createSlice } from "@reduxjs/toolkit";
import { findFavoritesThunk, updateFavoritesThunk } from "../services/list-thunks";

const listSlice = createSlice({
  name: "list",
  initialState: { currentMovie: null, currentUpdate: false, new_loading: false },
  reducers: {},
  extraReducers: {
    [updateFavoritesThunk.fulfilled]: (state, payload) => {
      state.currentMovie = { ...state.currentMovie, ...payload };
      state.loading = false
    },
    [findFavoritesThunk.fulfilled]: (state, payload) => {
      state.currentMovie = payload
      state.new_loading = false
    },
  },
});
export default listSlice.reducer;

