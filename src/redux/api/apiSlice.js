import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setTokens, logOut } from '../auth/authActions';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.tokens?.access;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.originalStatus === 403 ||
    result?.error?.status === 401 ||
    result?.error?.status === 403
  ) {
    const refreshToken = api.getState().auth?.tokens?.refresh;
    let refreshResult = null;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/jwt/refresh/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        refreshResult = data;
      }
    } catch (err) {
      console.log('refresherror', err);
    }
    if (refreshResult) {
      api.dispatch(setTokens({ tokens: refreshResult }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
