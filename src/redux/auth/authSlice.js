import { createSlice } from '@reduxjs/toolkit';
import { logOut, setTokens } from './authActions';
import { authApiSlice } from './authApiSlice';

const initialState = {
  tokens: localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null,
};

const authSlice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setTokens, (state, action) => {
        const { tokens } = action.payload;
        console.log('setTokens', tokens);
        localStorage.setItem('authTokens', JSON.stringify(tokens));
        state.tokens = tokens;
      })
      .addCase(logOut, (state) => {
        localStorage.removeItem('authTokens');
        localStorage.removeItem('googleAuth');
        state.tokens = null;
      })
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, action) => {
          state.tokens = action.payload;
          localStorage.setItem('authTokens', JSON.stringify(action.payload));
        },
      )
      .addMatcher(
        authApiSlice.endpoints.googleLogin.matchFulfilled,
        (state, action) => {
          console.log('google action', action.payload);
          if (action.payload?.access) {
            state.tokens = action.payload;
            localStorage.setItem('authTokens', JSON.stringify(action.payload));
            localStorage.setItem('googleAuth', true);
          }
        },
      );
  },
});

export default authSlice.reducer;

export const selectTokens = (state) => state.auth.tokens;
