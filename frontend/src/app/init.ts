import store from './store'
import { channelsApi } from 'entities/channels/model'
import { setActiveChannel } from 'shared/model/chatSlice'
import { messagesApi } from 'entities/messages/model'
import { socket } from './socket'

export const init = () => {
    socket.on('newChannel', (channel) => {
        store.dispatch(
            channelsApi.util.updateQueryData(
                'getChannels',
                undefined,
                (draft) => {
                    draft.push(channel)
                }
            )
        )
    })
    socket.on('renameChannel', (channel) => {
        store.dispatch(
            channelsApi.util.updateQueryData(
                'getChannels',
                undefined,
                (draft) => {
                    const state = store.getState()
                    if (state.chat.activeChannel.id === channel.id) {
                        store.dispatch(
                            setActiveChannel({
                                ...state.chat.activeChannel,
                                name: channel.name,
                            })
                        )
                    }
                    return draft.map((c) => (c.id === channel.id ? channel : c))
                }
            )
        )
    })
    socket.on('removeChannel', ({ id }) => {
        store.dispatch(
            channelsApi.util.updateQueryData(
                'getChannels',
                undefined,
                (draft) => {
                    const state = store.getState()
                    if (state.chat.activeChannel.id === id) {
                        store.dispatch(setActiveChannel(null))
                    }
                    const newChannels = draft.filter((c) => c.id !== id)
                    return newChannels
                }
            )
        )
    })
    socket.on('newMessage', (message) => {
        store.dispatch(
            messagesApi.util.updateQueryData(
                'getMessages',
                message.channelId,
                (draft) => {
                    draft.push(message)
                }
            )
        )
        store.dispatch(
            messagesApi.util.updateQueryData(
                'getAllMessages',
                undefined,
                (draft) => {
                    draft.push(message)
                }
            )
        )
    })
}
