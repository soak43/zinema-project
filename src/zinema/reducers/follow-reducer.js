import { createSlice, current } from "@reduxjs/toolkit";
import { updateFollowThunk } from "../services/follow-thunks";

const followSlice = createSlice({
  name: "follow",
  initialState: { currentUser: null, currentUpdate: false, new_loading: false },
  reducers: {},
  extraReducers: {
    [updateFollowThunk.fulfilled]: (state, payload) => {
    console.log("Inside follow reducer");
      console.log("Previous state  = ", current(state));
      console.log("payloaad = ", payload);
      state.currentUser = { ...state.currentUser, ...payload };
      console.log("Updates state  = ", current(state));
      state.loading = false
    }
  },
});
export default followSlice.reducer;

