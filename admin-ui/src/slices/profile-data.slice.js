import {createSlice} from "@reduxjs/toolkit";

const initialProfile = {
  token: null,
}

const ProfileDataSlice = createSlice({
  name: 'ProfileDataSlice',
  initialState: initialProfile,
  reducers: {
    // Add synchronous reducers here
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    handleLogout: (state) => {
      state.token = null;
    },
    resetProfileData: initialProfile,
  },
  extraReducers: (builder) => {

  },
});

export const {
  updateToken,
} = ProfileDataSlice.actions;

export default ProfileDataSlice.reducer;