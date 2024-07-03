import { authApi } from 'features/auth/model'

import { messagesApi } from 'entities/messages/model'

import { combineReducers, configureStore } from '@reduxjs/toolkit/react'
import { channelsApi } from 'entities/channels/model'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { chatReducer } from 'shared/model/chatSlice'

const rootReducer = combineReducers({
    chat: chatReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['chat'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat([
            channelsApi.middleware,
            messagesApi.middleware,
            authApi.middleware,
        ]),
})
export const persistor = persistStore(store)
export default store
