import { createSlice } from '@reduxjs/toolkit';

import { networksApiSlice } from './networksApiSlice';

const initialState = {
  networks: null,
  sharedNetworks: null,
};

const networksSlice = createSlice({
  name: 'networks',
  initialState: initialState,
  reducers: {
    changeIsPublic(state, action) {
      const { id, value } = action.payload;
      const networks = state.networks;
      const targetNetwork = networks?.find((obj) => obj.id === id);
      if (targetNetwork) {
        targetNetwork.is_public = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      networksApiSlice.endpoints.getNetworks.matchFulfilled,
      (state, action) => {
        state.networks = action.payload;
      },
    );
  },
});

export const { changeIsPublic } = networksSlice.actions;

export const selectNetworks = (state) => state.networks.networks;

export default networksSlice.reducer;
