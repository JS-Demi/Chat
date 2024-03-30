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
	reducerPath: 'messages',
	baseQuery: fetchBaseQuery({ baseUrl: 'api/v1/messages', prepareHeaders }),
	tagTypes: ['Message'],
	endpoints: (builder) => ({
		getMessages: builder.query({
			query: () => '',
			providesTags: (result, error, arg) =>
				result ? [...result.map(({ channelId }) => ({ type: 'Message', id: channelId })), 'Message'] : ['Message'],
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				const socket = io()
				try {
					await cacheDataLoaded

					socket.on('newMessage', (message) => {
						updateCachedData((draft) => {
							draft.push(message)
						})
					})
				} catch {
					console.log('something went wrong')
				}
				await cacheEntryRemoved
				socket.off('newMessage')
			},
		}),

		sendMessage: builder.mutation({
			query: (body) => ({
				url: '',
				method: 'POST',
				body,
			}),
		}),
		editMessage: builder.mutation({
			query: ({ message, id }) => ({
				url: id,
				method: 'PATCH',
				body: {
					message,
				},
			}),
		}),
		deleteMessage: builder.mutation({
			query: (id) => ({
				url: id,
				method: 'DELETE',
			}),
		}),
	}),
})

export const { useGetMessagesQuery, useSendMessageMutation, useEditMessageMutation, useDeleteMessageMutation } = api

// async onQueryStarted(message, { dispatch, queryFulfilled }) {
// 	const patchResult = dispatch(
// 		api.util.updateQueryData('getMessages', undefined, (draft) => {
// 			draft.push(message)
// 		})
// 	)
// 	queryFulfilled.catch(patchResult.undo)
// },
