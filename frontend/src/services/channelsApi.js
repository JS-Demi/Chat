import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const prepareHeaders = (headers) => {
	const token = localStorage.getItem('access_token')

	if (token) {
		headers.set('Authorization', `Bearer ${token}`)
	}
	return headers
}

export const api = createApi({
	reducerPath: 'channels',
	baseQuery: fetchBaseQuery({ baseUrl: 'api/v1/channels', prepareHeaders }),
	endpoints: (builder) => ({
		getChannels: builder.query({
			query: () => '',
		}),
		getChannelById: builder.query({
			query: (id) => id,
		}),
		addChannel: builder.mutation({
			query: (name) => ({
				url: '',
				method: 'POST',
				body: {
					name,
				},
			}),
		}),
		editChannel: builder.mutation({
			query: ({ name, id }) => ({
				url: id,
				method: 'PATCH',
				body: {
					name,
				},
			}),
		}),
		deleteChannel: builder.mutation({
			query: (id) => ({
				url: id,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useGetChannelsQuery,
	useAddChannelMutation,
	useEditChannelMutation,
	useDeleteChannelMutation,
	useGetChannelByIdQuery,
} = api
