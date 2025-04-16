import {createSlice} from "@reduxjs/toolkit";

const initialProfile = {
  token: null,
  triggerGetCart: false,
  cartSession: {},  // non login
  cartUser: {},     // logged in
}

const ProfileDataSlice = createSlice({
  name: 'ProfileDataSlice',
  initialState: initialProfile,
  reducers: {
    // Add synchronous reducers here
    updateToken: (state, action) => {
      state.token = action.payload;
      state.triggerGetCart = true;
    },
    setTriggerGetCart: (state, action) => {
      state.triggerGetCart = action.payload;
    },
    setCartUser: (state, action) => {
      state.cartUser = action.payload;
      state.triggerGetCart = false;
    },
    handleLogout: (state) => {
      state.token = null;
      state.cartUser = {};
    },
    resetProfileData: initialProfile,
  },
  extraReducers: (builder) => {

  },
});

export const {
  updateToken,
  setTriggerGetCart,
  setCartUser,
  handleLogout,
  resetProfileData,
} = ProfileDataSlice.actions;

export default ProfileDataSlice.reducer;