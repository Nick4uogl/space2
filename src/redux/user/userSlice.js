import { createSlice } from '@reduxjs/toolkit';

import { userApiSlice } from './userApiSlice';

const initialState = {
  user: null,
  userSignUpData: null,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserSignUpData(state, action) {
      state.userSignUpData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.getUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loading = false;
      },
    );
  },
});

export const { setUserSignUpData } = userSlice.actions;

export const selectUserSignUpData = (state) => state.user.userSignUpData;
export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;

export default userSlice.reducer;
