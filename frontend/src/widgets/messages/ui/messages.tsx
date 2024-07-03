import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Flex,
    Heading,
    IconButton,
    ScaleFade,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { useGetMessagesQuery } from 'entities/messages/model'
import { MessagesPreview } from 'entities/messages/ui'
import { NewMessage } from 'features/messages'

import { FC } from 'react'
import { useTranslation } from '../../../../node_modules/react-i18next'
import { useAppSelector } from 'shared/lib/store'
import { selectActiveChannel } from 'shared/model/chatSlice'
import { MySpinner } from 'shared/ui/spinner'

interface IMessages {
    readonly isMobileScreen: boolean
    readonly setModePersist: (mode: 'channels' | 'messages') => void
    readonly isMessagesOpen: boolean
}

export const Messages: FC<IMessages> = ({
    isMobileScreen,
    isMessagesOpen,
    setModePersist,
}) => {
    const { id: activeChannelId, name } = useAppSelector(selectActiveChannel)
    const {
        data: messages,
        isFetching,
        isSuccess,
    } = useGetMessagesQuery(activeChannelId)
    const { t } = useTranslation()
    const {
        onOpen: onEmojiOpen,
        onClose: onEmojiClose,
        isOpen: isEmojiOpen,
    } = useDisclosure()

    return (
        <Flex
            flexDirection={'column'}
            as={'section'}
            width={isMobileScreen ? '100%' : '60%'}
            transform={`translateX(${
                !isMobileScreen || isMessagesOpen ? '0%' : '100%'
            })`}
            bgImage={`url(pattern-5.svg),
            linear-gradient(315deg, #E55D87, #5FC3E4)`}
            right={0}
            h={'100%'}
            transition={'all 0.6s'}
            position={'fixed'}>
            {isFetching && <MySpinner />}
            {isSuccess && (
                <>
                    <ScaleFade in={true} initialScale={0.7}>
                        <Flex
                            alignItems={'center'}
                            p={'1em 1em 1em 1em'}
                            bgColor={'#fff'}
                            gap='10px'
                            justifyContent={'space-between'}
                            boxShadow={'0 3px 5px -2px rgba(50, 50, 50, 0.75)'}>
                            {isMobileScreen && (
                                <IconButton
                                    aria-label='open-channels-box'
                                    color='#E55D87'
                                    _hover={{ bgColor: '#5fc3e461' }}
                                    variant={'ghost'}
                                    isRound
                                    onClick={() => {
                                        onEmojiClose()
                                        setModePersist('channels')
                                    }}
                                    icon={<ArrowBackIcon fontSize={'35px'} />}
                                />
                            )}
                            <Avatar name={name} />
                            <Stack flexGrow={1}>
                                <Heading
                                    as={'h4'}
                                    size='sm'>{`${name}`}</Heading>
                                <Text color={'grey'}>
                                    {t('chat.messages.count', {
                                        count: messages.length,
                                    })}
                                </Text>
                            </Stack>
                        </Flex>
                    </ScaleFade>
                    <MessagesPreview messages={messages} />
                    <NewMessage
                        channelId={activeChannelId}
                        isOpen={isEmojiOpen}
                        onOpen={onEmojiOpen}
                    />
                </>
            )}
        </Flex>
    )
}
