import { current, createSlice } from "@reduxjs/toolkit";
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
    console.log("update user", current(state));
    console.log("update user", payload);
    state.currentUser = payload ;
    console.log("update user", state.currentUser)
  },

    [registerThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },   
   [loginThunk.fulfilled]: (state, { payload }) => {
    console.log("login user", current(state));
    console.log("login user", payload);
     state.currentUser = payload;
   },
 },
});
export default authSlice.reducer;