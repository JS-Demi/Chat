import { configureStore } from '@reduxjs/toolkit'
import { loginApi } from '../services/loginApi'
import authReducer from './slices/authSlice'

export const store = configureStore({
	reducer: {
		[loginApi.reducerPath]: loginApi.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware),
})
