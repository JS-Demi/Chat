import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
	reducerPath: 'login',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/login' }),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: '',
				method: 'POST',
				body,
			}),
		}),
	}),
})

export const { useLoginMutation } = loginApi
