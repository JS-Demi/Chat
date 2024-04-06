/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popUpData: null,
  activeChannel: { name: 'general', id: '1' },
  username: null,
  token: null,
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
} =
  commonSlice.actions;
export const selectActiveChannel = (state) => state.common.activeChannel;
export const selectPopUpData = (state) => state.common.popUpData;
export default commonSlice.reducer;
