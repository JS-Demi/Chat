import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
	name: 'common',
	initialState: {
		activeChannel: { name: 'General', id: '1' },
		isOpenModal: false,
	},
	reducers: {
		setActiveChannel: (state, action) => {
			state.activeChannel = action.payload
		},
		setModalState: (state, { payload }) => {
			state.isOpenModal = payload
		},
	},
})

export const { setActiveChannel, setModalState } = commonSlice.actions
export default commonSlice.reducer
export const selectModalState = (state) => state.common.isOpenModal
