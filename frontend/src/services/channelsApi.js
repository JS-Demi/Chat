import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from 'socket.io-client'

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
	tagTypes: ['Message'],
	endpoints: (builder) => ({
		getChannels: builder.query({
			query: () => '',
			providesTags: ['Message'],
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				const socket = io()
				try {
					await cacheDataLoaded

					socket.on('newChannel', (channel) => {
						updateCachedData((draft) => {
							draft.push(channel)
						})
					})
					socket.on('renameChannel', (channel) => {
						updateCachedData((draft) => {
							return draft.map((c) => (c.id === channel.id ? channel : c))
						})
					})
					socket.on('removeChannel', ({ id }) => {
						updateCachedData((draft) => {
							return draft.filter((c) => c.id !== id)
						})
					})
				} catch {
					console.log('oh, its error')
				}
				await cacheEntryRemoved
				socket.off('newChannel')
				socket.off('renameChannel')
				socket.off('removeChannel')
			},
		}),
		addChannel: builder.mutation({
			query: (body) => ({
				url: '',
				method: 'POST',
				body,
			}),
		}),
		renameChannel: builder.mutation({
			query: ({ name, id }) => ({
				url: id,
				method: 'PATCH',
				body: name,
			}),
		}),
		removeChannel: builder.mutation({
			query: (id) => ({
				url: id,
				method: 'DELETE',
				invalidatesTags: (result, error, id) => {
					console.log(result, id)
					return [{ type: 'Message', id }]
				},
			}),
		}),
	}),
})

export const { useGetChannelsQuery, useAddChannelMutation, useRenameChannelMutation, useRemoveChannelMutation } = api
