import { Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { useMode } from 'shared/lib/mode'
import { useResize } from 'shared/lib/resize'
import { Channels } from 'widgets/channels'
import { Messages } from 'widgets/messages'

interface IChat {}

export const Chat: FC<IChat> = () => {
    const { isMobileScreen } = useResize()
    const { isChannelsOpen, isMessagesOpen, setModePersist } = useMode()

    return (
        <Flex
            as={'main'}
            width={'100%'}
            height={'100%'}
            boxShadow='0 5px 15px rgba(0, 0, 0, 0.35)'>
            <Channels
                isMobileScreen={isMobileScreen}
                setModePersist={setModePersist}
                isChannelsOpen={isChannelsOpen}
                isMessagesOpen={isMessagesOpen}
            />
            <Messages
                isMobileScreen={isMobileScreen}
                setModePersist={setModePersist}
                isMessagesOpen={isMessagesOpen}
            />
        </Flex>
    )
}
