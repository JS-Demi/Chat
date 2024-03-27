import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
		user: null,
		token: null,
	},
	reducers: {
		setCredentials: (state, { payload: { username, token } }) => {
			state.isLoggedIn = true
			state.user = username || null
			state.token = token || null
		},
		removeCredentials: (state) => {
			state.isLoggedIn = false
		},
	},
})

export const { setCredentials, removeCredentials } = slice.actions
export default slice.reducer
export const selectUser = (state) => state.auth.user
