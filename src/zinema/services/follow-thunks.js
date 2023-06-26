import { createAsyncThunk } from "@reduxjs/toolkit";
import * as followService from "./follow-service.js";

export const updateFollowThunk = createAsyncThunk(
  "users/follow",
  async (followData) => {
    try {
      console.log("inside follow Thunk");
      console.log("follow data in follow Thunk: ", followData);
      console.log("movie id in updateFavorites thunk: ", followData.user_id);
      const response = await followService.updateFollow(followData);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);
