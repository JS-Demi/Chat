import { getCredentialsToken } from 'shared/lib/auth'
import { IMessage } from 'shared/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const prepareHeaders = (headers: Headers) => {
    const token = getCredentialsToken()
    if (token) {
        headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
}
// prettier-ignore
export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/messages', prepareHeaders }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query<IMessage[], string>({
      query: () => '',
      transformResponse: (response: IMessage[], _meta, arg) => {
        return response.filter((message: IMessage) => message.channelId === arg)
      }
    }),
    getAllMessages: builder.query<IMessage[], void>({
      query: () => '',
    }),
    sendMessage: builder.mutation<IMessage, Omit<IMessage, 'id'>>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
    useGetMessagesQuery,
    useGetAllMessagesQuery,
    useSendMessageMutation,
} = messagesApi
