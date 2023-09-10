import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentData: null,
};

const resourcesSlice = createSlice({
  name: 'networks',
  initialState: initialState,
  reducers: {
    setPaymentData(state, action) {
      state.paymentData = action.payload;
    },
  },
});

export const { setPaymentData } = resourcesSlice.actions;

export const selectPaymentData = (state) => state.resources.paymentData;

export default resourcesSlice.reducer;
