import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCredentialsToken } from 'shared/lib/auth'
import { IChannel, IChannelResponse } from 'shared/types'

const prepareHeaders = (headers: Headers) => {
    const token = getCredentialsToken()
    if (token) {
        headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
}
// prettier-ignore
export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/channels', prepareHeaders }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getChannels: builder.query<IChannelResponse[], void>({
      query: () => '',
    }),
    createChannel: builder.mutation<IChannelResponse, Pick<IChannel, 'name'>>({
      query: (body) =>  ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    renameChannel: builder.mutation<IChannelResponse, IChannel>({
      query: ({ name, id }) => ({
        url: id,
        method: 'PATCH',
        body: {name},
      }),
    }),
    removeChannel: builder.mutation<Pick<IChannelResponse, 'id'>, string>({
      query: (id: string) => ({
        url: id,
        method: 'DELETE',
        invalidatesTags: (channelId: string) => [{ type: 'Message', channelId }],
      }),
    }),
  }),
});

export const {
    useGetChannelsQuery,
    useCreateChannelMutation,
    useRenameChannelMutation,
    useRemoveChannelMutation,
} = channelsApi
