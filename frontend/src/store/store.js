import { configureStore } from '@reduxjs/toolkit'
import { api as loginApi } from '../services/authenticationApi.js'
import { api as channelsApi } from '../services/channelsApi.js'
import { api as messagesApi } from '../services/messagesApi.js'
import common from './slices/commonSlice.js'

export const store = configureStore({
	reducer: {
		common,
		[channelsApi.reducerPath]: channelsApi.reducer,
		[messagesApi.reducerPath]: messagesApi.reducer,
		[loginApi.reducerPath]: loginApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			loginApi.middleware,
			channelsApi.middleware,
			messagesApi.middleware,
		]),
})
