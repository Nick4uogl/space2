import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import networksReducer from './networks/networksSlice';
import resourcesReducer from './resources/resourcesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    networks: networksReducer,
    resources: resourcesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
