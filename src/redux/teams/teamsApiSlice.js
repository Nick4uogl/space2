import { apiSlice } from '../api/apiSlice';

const teamsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: (id) => {
        return {
          url: `/teams/${id}/`,
          method: 'GET',
        };
      },
    }),
    addMember: builder.mutation({
      query: (body) => {
        return {
          url: `/teams/${body.id}/add_member/`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    deleteMember: builder.mutation({
      query: (body) => {
        return {
          url: `/teams/${body.id}/delete_member/`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
  }),
});

export const {
  useGetTeamQuery,
  useAddMemberMutation,
  useDeleteMemberMutation,
} = teamsApiSlice;
