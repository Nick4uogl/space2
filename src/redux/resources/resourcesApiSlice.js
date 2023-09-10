import { apiSlice } from '../api/apiSlice';

export const networksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query({
      query: () => ({
        url: '/resources/',
        method: 'GET',
      }),
    }),
    getResource: builder.query({
      query: (id) => ({
        url: `/resources/${id}`,
        method: 'GET',
      }),
    }),
    getPaidResources: builder.query({
      query: () => ({
        url: '/resources/get_paid_resources/',
        method: 'GET',
      }),
    }),
    voteResource: builder.mutation({
      query: (id) => ({
        url: `/resources/${id}/vote/`,
        method: 'POST',
      }),
    }),
    unVoteResource: builder.mutation({
      query: (id) => ({
        url: `/resources/${id}/unvote/`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useVoteResourceMutation,
  useUnVoteResourceMutation,
  useGetResourceQuery,
  useGetPaidResourcesQuery,
} = networksApiSlice;
