import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
	name: 'common',
	initialState: {
		activeChannel: { name: 'General', id: '1' },
	},
	reducers: {
		setActiveChannel: (state, action) => {
			state.activeChannel = action.payload
		},
	},
})

export const { setActiveChannel } = commonSlice.actions
export default commonSlice.reducer
