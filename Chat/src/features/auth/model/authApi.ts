import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuthRequest, IAuthResponse } from 'shared/types'

export const api = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, IAuthRequest>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
        createUser: builder.mutation<RootState, AppDispatch>({
            query: (body) => ({
                url: 'signup',
                method: 'POST',
                body,
            }),
        }),
    }),
})
export const { useLoginMutation, useCreateUserMutation } = api
