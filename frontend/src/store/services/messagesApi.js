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
export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/v1/messages', prepareHeaders }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi;
