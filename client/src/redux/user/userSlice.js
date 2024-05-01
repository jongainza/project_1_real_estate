import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  _token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signedInUser: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state._token = action.payload._token;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    clearUserData: (state) => {
      state.currentUser = {};
      state._token = null;
      state.error = null;
    },
  },
});

export const { signedInUser, signInFailure, clearUserData } = userSlice.actions;
export default userSlice.reducer;
