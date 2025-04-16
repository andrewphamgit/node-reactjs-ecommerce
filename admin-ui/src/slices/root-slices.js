import {combineReducers} from "@reduxjs/toolkit";
import ProfileDataSlice from "./profile-data.slice.js";

const RootReducer = combineReducers({
  ProfileDataSlice: ProfileDataSlice,
});

export default RootReducer;