import { IChannel } from '../../types'

export enum channelsActions {
    CREATE = 'Создать канал',
    EDIT = 'Переименовать канал',
    REMOVE = 'Удалить канал',
}

export interface IUserActionData {
    action: channelsActions | null
    id: string
    name: string
}
export interface IChatState {
    activeChannel: IChannel
    userActionData: IUserActionData
}
