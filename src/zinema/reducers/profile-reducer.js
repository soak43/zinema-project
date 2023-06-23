import { createSlice } from "@reduxjs/toolkit";
import { findUserByIDThunk, findFollowingThunk } from "../services/user-thunk";
import { loginThunk } from "../services/auth-thunks";

const profileUserSlice = createSlice({
    name: "profile",
    initialState: { 
        profileUser : null,
        followingUsers: null,
        followedUsers: null
    },
    reducers: {},
    extraReducers: {
        [findUserByIDThunk.fulfilled] : (state, {payload}) => {
            state.profileUser = payload;
        },
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.profileUser = payload;
            state.followedUsers = payload.followingList;
            state.followingUsers = payload.followerList;
        },
        [findFollowingThunk.fulfilled] : (state, {payload}) => {
            state.followingUsers = payload;
        }
    },
});

export default profileUserSlice.reducer;