import { IChannel, IChannelResponse, IMessage } from 'shared/types'
import { Socket, io } from 'socket.io-client'

interface ServerToClientEvents {
    newMessage: (payload: IMessage) => void
    newChannel: (payload: IChannelResponse) => void
    removeChannel: (payload: Pick<IChannel, 'id'>) => void
    renameChannel: (payload: IChannelResponse) => void
}

interface ClientToServerEvents {
    hello: () => void
}
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()
