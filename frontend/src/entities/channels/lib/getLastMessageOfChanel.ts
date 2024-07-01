import { messagesApi } from 'entities/messages/model'
import { i18n } from 'shared/config/i18n'
import { IMessage } from 'shared/types'

type ILastMessagesReturn = IMessage | string | null

export const getLastMessageOfChannel = (
    channelId: string
): ILastMessagesReturn => {
    const { data, isSuccess } =
        messagesApi.endpoints.getMessages.useQuery(channelId)
    if (isSuccess && data.length > 0) {
        const lastIndex = data.length - 1
        return data[lastIndex]
    }
    if (isSuccess && data.length === 0) {
        return i18n.t('chat.messages.count', { count: 0 })
    }
    return null
}
