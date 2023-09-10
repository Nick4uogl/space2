import { apiSlice } from '../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => {
        console.log('sign up body', body);
        return {
          url: '/sign-up/',
          method: 'POST',
          body: body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: '/password-reset/',
          method: 'POST',
          body: body,
        };
      },
    }),
    updateImage: builder.mutation({
      query: (body) => {
        return {
          url: `users/${body.id}/image/`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    resetPasswordConfirm: builder.mutation({
      query: (body) => {
        return {
          url: '/password-reset/confirm/',
          method: 'POST',
          body: body,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (body) => {
        return {
          url: 'user/update/',
          method: 'PATCH',
          body: body,
        };
      },
    }),
    updatePassword: builder.mutation({
      query: (body) => {
        return {
          url: 'change-password/',
          method: 'PATCH',
          body: body,
        };
      },
    }),
    getUserInfo: builder.query({
      query: (tokenKey) => {
        return {
          url: `/password-reset/get-user-info/${tokenKey}`,
          method: 'GET',
        };
      },
    }),
    getUser: builder.query({
      query: () => {
        return {
          url: '/me/',
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useGetUserQuery,
  useGetUserInfoQuery,
  useUpdateProfileMutation,
  useUpdateImageMutation,
  useUpdatePasswordMutation,
} = userApiSlice;
