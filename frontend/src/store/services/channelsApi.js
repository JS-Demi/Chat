import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const prepareHeaders = (headers) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
// prettier-ignore
export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/v1/channels', prepareHeaders }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ body, id }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
        invalidatesTags: (channelId) => [{ type: 'Message', channelId }],
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
