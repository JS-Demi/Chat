import { Box, Text } from '@chakra-ui/react'
import { useGetMessagesQuery } from 'entities/messages/model'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'shared/lib/auth'

interface ILastMessageOfChanel {
    channelId: string
}

export const LastMessageOfChanel: FC<ILastMessageOfChanel> = ({
    channelId,
}) => {
    const { data, isSuccess } = useGetMessagesQuery(channelId)
    const { t } = useTranslation()
    const { username: currentUser } = useAuth()
    if (!isSuccess) return null
    if (isSuccess && data.length === 0) {
        return (
            <Box fontWeight={'normal'} color={'grey'}>
                {t('chat.messages.count', { count: data.length })}
            </Box>
        )
    }
    const lastIndex = data.length - 1
    const { body, username } = data[lastIndex]
    const isCurrentUserMessage = username === currentUser
    return (
        <Box
            as='p'
            fontWeight={'500'}
            minW={0}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            color='grey'
            whiteSpace={'nowrap'}>
            <Text as={'span'} color='#000'>{`${
                isCurrentUserMessage ? t('chat.messages.you') : username
            }: `}</Text>
            <Text as={'span'}>{body}</Text>
        </Box>
    )
}
