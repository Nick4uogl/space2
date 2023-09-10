import { apiSlice } from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: '/auth/jwt/',
          method: 'POST',
          body: { ...credentials },
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: '/logout/',
          method: 'POST',
        };
      },
    }),
    decodeGoogleToken: builder.mutation({
      query: (body) => {
        return {
          url: '/google-auth/social/google-oauth2/',
          method: 'POST',
          body: { id_token: body },
        };
      },
    }),
    googleLogin: builder.mutation({
      query: (credentials) => {
        console.log('credentials', credentials);
        return {
          url: '/google-auth/social/google-oauth2/',
          method: 'POST',
          body: credentials,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useDecodeGoogleTokenMutation,
} = authApiSlice;
