import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./user-service";

export const findFollowingThunk = createAsyncThunk(
    "user/following", async (followingList) => {
        console.log("Inside user thunk");
        const user = await userService.findFollowing({followingList});
        console.log("thunk response = ", user);
        return user;
    }
);

export const findUserByIDThunk = createAsyncThunk(
    "user/uid", async (uid) => {
        console.log("Inside user thunk");
        console.log("uid = ", uid);
        console.log("UID = ", {uid});
        const user = await userService.findUserById({uid});
        console.log("Thunk user = ",user);
        return user;
    }
);

export const findUserByFirstNameThunk = createAsyncThunk(
    "user/firstname", async (firstName) => {
      const user = await userService.findUserByFirstName(firstName);
      return user;
    }
);
  
  
export const findUserByLastNameThunk = createAsyncThunk(
    "user/firstname", async (lastName) => {
        const user = await userService.findUserByLastName(lastName);
        return user;
    }
);

export const findUserByUsernameThunk = createAsyncThunk(
    "user/username", async (username) => {
        const user = await userService.findUserByUsername(username);
        return user;
    }
);

