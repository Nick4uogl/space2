import { apiSlice } from '../api/apiSlice';

export const subscriptionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (body) => {
        return {
          url: '/subscriptions/create_subscription/',
          method: 'POST',
          body: body,
        };
      },
    }),
    cancelSubscription: builder.mutation({
      query: () => {
        return {
          url: '/subscriptions/cancel_subscription/',
          method: 'POST',
        };
      },
    }),
    renewSubscription: builder.mutation({
      query: () => {
        return {
          url: '/subscriptions/renew_subscription/',
          method: 'POST',
        };
      },
    }),
    pauseSubscription: builder.mutation({
      query: () => {
        return {
          url: '/subscriptions/pause_subscription/',
          method: 'POST',
        };
      },
    }),
    modifySubscription: builder.mutation({
      query: () => {
        return {
          url: '/subscriptions/modify_subscription/',
          method: 'PATCH',
        };
      },
    }),
    postProrationsAmount: builder.mutation({
      query: (body) => {
        return {
          url: '/subscriptions/prorations_amount/',
          method: 'POST',
          body: body,
        };
      },
    }),
    getSubscription: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/subscriptions/get_subscription/',
        };
      },
    }),
    getDiscountsInfo: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/subscriptions/discounts_info/',
        };
      },
    }),
    getScheduledSubscription: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/subscriptions/get_scheduled_subscription/',
        };
      },
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetSubscriptionQuery,
  useGetScheduledSubscriptionQuery,
  useCancelSubscriptionMutation,
  useRenewSubscriptionMutation,
  useGetDiscountsInfoQuery,
  usePauseSubscriptionMutation,
  useModifySubscriptionMutation,
  usePostProrationsAmountMutation,
} = subscriptionsApiSlice;
