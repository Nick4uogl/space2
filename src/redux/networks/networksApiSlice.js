import { apiSlice } from '../api/apiSlice';

export const networksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNetworks: builder.query({
      query: () => ({
        url: '/networks/',
        method: 'GET',
      }),
    }),
    getNetwork: builder.query({
      query: (id) => ({
        url: `/networks/${id}/`,
        method: 'GET',
      }),
    }),
    getFromRecycleBin: builder.query({
      query: () => ({
        url: '/networks/get_from_recycle_bin/',
        method: 'GET',
      }),
    }),
    getNetworkWithPrevAndNext: builder.query({
      query: (id) => ({
        url: `/networks/${id}/get_with_prev_and_next/`,
        method: 'GET',
      }),
    }),
    patchNetwork: builder.mutation({
      query: (body) => {
        return {
          url: `/networks/${body.id}/`,
          method: 'PATCH',
          body: body.data,
        };
      },
    }),
    cloneNetwork: builder.mutation({
      query: (id) => {
        return {
          url: `/networks/${id}/clone/`,
          method: 'POST',
        };
      },
    }),
    editNetworkDescription: builder.mutation({
      query: (body) => {
        return {
          url: `/networks/${body.id}/modify_network_desc/`,
          method: 'PATCH',
          body: body.data,
        };
      },
    }),
    editNetworkName: builder.mutation({
      query: (body) => {
        return {
          url: `/networks/${body.id}/modify_network_name/`,
          method: 'PATCH',
          body: body.data,
        };
      },
    }),
    editIsPublic: builder.mutation({
      query: (body) => {
        return {
          url: `/networks/${body.id}/modify_is_public/`,
          method: 'PATCH',
          body: body.data,
        };
      },
    }),
    editOverallAccess: builder.mutation({
      query: (body) => {
        return {
          url: `/networks/${body.id}/modify_overall_access/`,
          method: 'PATCH',
          body: body.data,
        };
      },
    }),
    getNetworkShares: builder.query({
      query: (networkId) => ({
        url: networkId
          ? `/networkshares/?network__id=${networkId}`
          : '/networkshares/',
        method: 'GET',
      }),
    }),
    postNetworkShare: builder.mutation({
      query: (body) => ({
        url: '/networkshares/',
        method: 'POST',
        body: body,
      }),
    }),
    postNetwork: builder.mutation({
      query: (body) => ({
        url: '/networks/',
        method: 'POST',
        body: body,
      }),
    }),
    patchNetworkShare: builder.mutation({
      query: (body, id) => {
        return {
          url: `/networkshares/${body.id}/`,
          method: 'PATCH',
          body: body.data,
        };
      },
    }),
    deleteNetwork: builder.mutation({
      query: (body) => ({
        url: '/networks/delete/',
        method: 'DELETE',
        body: {
          network_ids: body,
        },
      }),
    }),
    removeNetwork: builder.mutation({
      query: (body) => ({
        url: '/networks/remove/',
        method: 'POST',
        body: {
          network_ids: body,
        },
      }),
    }),
    restoreNetworks: builder.mutation({
      query: (body) => ({
        url: '/networks/restore/',
        method: 'POST',
        body: {
          network_ids: body,
        },
      }),
    }),
  }),
});

export const {
  useGetNetworksQuery,
  useDeleteNetworkMutation,
  useGetNetworkSharesQuery,
  usePostNetworkShareMutation,
  useGetNetworkQuery,
  usePatchNetworkMutation,
  usePatchNetworkShareMutation,
  usePostNetworkMutation,
  useCloneNetworkMutation,
  useEditIsPublicMutation,
  useEditNetworkDescriptionMutation,
  useEditNetworkNameMutation,
  useEditOverallAccessMutation,
  useGetNetworkWithPrevAndNextQuery,
  useGetFromRecycleBinQuery,
  useRemoveNetworkMutation,
  useRestoreNetworksMutation,
} = networksApiSlice;
