/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const defaultChannel = { name: 'general', id: '1' };
const initialState = {
  popUpData: null,
  activeChannel: defaultChannel,
  username: null,
  token: null,
  defaultChannel,
};
const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.activeChannel = payload;
    },
    setPopUpData: (state, { payload }) => {
      state.popUpData = payload;
    },
  },
});
// prettier-ignore
export const {
  setActiveChannel, setPopUpData, setCredentials, removeCredentials,
} = commonSlice.actions;
export const selectActiveChannel = (state) => state.common.activeChannel;
export const selectPopUpData = (state) => state.common.popUpData;
export const selectDefaultChannel = (state) => state.common.defaultChannel;
export default commonSlice.reducer;
