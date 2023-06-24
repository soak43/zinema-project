import { createAsyncThunk } from "@reduxjs/toolkit";
import * as listService from "./list-service"

export const updateFavoritesThunk = createAsyncThunk(
  "movies/updateFavorites",
  async (favoriteData) => {
    try {
      console.log("inside favoriteToggleThunk");
      console.log("favorite data in favoriteToggle Thunk: ", favoriteData);
      console.log("movie id in updateFavorites thunk: ", favoriteData.movie_id);
      const response = await listService.updateFavorites(favoriteData);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);


export const findFavoritesThunk = createAsyncThunk(
  "movies/findFavorites",
  async (favoriteData) => {
    try {
      console.log("inside findFavorites thunk");
      console.log("favorite data in findFavorites Thunk: ", favoriteData);
      console.log("movie id in findFavoritesthunk: ", favoriteData.movie_id);
      const response = await listService.findFavorites(favoriteData);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);
