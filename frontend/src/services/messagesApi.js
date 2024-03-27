import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
	tagTypes: ['Messages'],
	endpoints: (builder) => ({
		getMessages: builder.query({
			query: () => '',
			providesTags: ['Messages'],
		}),
		sendMessage: builder.mutation({
			query: (body) => ({
				url: '',
				method: 'POST',
				body,
			}),
			async onQueryStarted(message, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					api.util.updateQueryData('getMessages', undefined, (draft) => {
						draft.push(message)
						console.log('it workss')
						console.log(queryFulfilled)
						console.log(draft)
					})
				)
				queryFulfilled.catch(patchResult.undo)
			},
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

export const {
	useGetMessagesQuery,
	useSendMessageMutation,
	useEditMessageMutation,
	useDeleteMessageMutation,
} = api
