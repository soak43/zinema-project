import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk, profileThunk, updateUserThunk } from "../services/auth-thunks";

const authSlice = createSlice({
 name: "auth",
 initialState: { currentUser: null },
 reducers: {},
 extraReducers: {
  [logoutThunk.fulfilled]: (state) => {
    state.currentUser = null;
  },
  [profileThunk.fulfilled]: (state, { payload }) => {
    state.currentUser = payload;
  },
  [profileThunk.rejected]: (state) => {
    state.currentUser = null;
  },
  [profileThunk.pending]: (state, action) => {
    state.currentUser = null;
  },
  [updateUserThunk.fulfilled]: (state, { payload }) => {
    console.log("Payload = ", payload);
    state.currentUser = payload;
  },
    [registerThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },   
   [loginThunk.fulfilled]: (state, { payload }) => {
    console.log("Previous state = ", state.currentUser);
    console.log("Payload = ", payload);
     state.currentUser = payload;
     console.log("Current state = ", state.currentUser);
   },
 },
});
export default authSlice.reducer;