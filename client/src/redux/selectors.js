import { createSelector } from "@reduxjs/toolkit";

// Define a selector function to get the _token from the Redux state
export const selectToken = createSelector(
  (state) => state.user._token,
  (_token) => _token
);
