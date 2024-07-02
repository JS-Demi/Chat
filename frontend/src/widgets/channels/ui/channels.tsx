import {
    Divider,
    Flex,
    ScaleFade,
    Stack,
    useDisclosure,
} from '@chakra-ui/react'
import { useGetChannelsQuery } from 'entities/channels/model'
import { ChannelsPreview } from 'entities/channels/ui'
import { CreateChannelButton } from 'features/channels/ui'
import { ControlMenu } from 'features/channels/ui/control-menu'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import {
    channelsActions,
    selectUserActionData,
    setActiveChannel,
    setUserActionData,
} from 'shared/model/chatSlice'
import { PopUp } from 'shared/ui/modal'
import { MySpinner } from 'shared/ui/spinner'
import { usePopUp } from '../lib'

interface IChannels {
    readonly isMobileScreen: boolean
    readonly isChannelsOpen: boolean
    readonly isMessagesOpen: boolean
    readonly setModePersist: (mode: 'channels' | 'messages') => void
}

export const Channels: FC<IChannels> = ({
    isMobileScreen = true,
    setModePersist,
    isChannelsOpen,
    isMessagesOpen,
}) => {
    // hooks
    const dispatch = useAppDispatch()
    const { data: channels, isSuccess, isFetching } = useGetChannelsQuery()
    const { onClose, onOpen, isOpen } = useDisclosure()
    const { action, id, name } = useAppSelector(selectUserActionData)
    const PopUpAction = usePopUp(action!)
    // handlers
    const handleUserAction = (action: channelsActions, id = '', name = '') => {
        dispatch(setUserActionData({ action, id, name }))
    }
    const handleSetActiveChannel = (id: string, name: string) => () => {
        dispatch(setActiveChannel({ id, name }))
        if (isMobileScreen) {
            setModePersist('messages')
        }
    }
    return (
        <Stack
            as={'section'}
            spacing={0}
            position={'fixed'}
            left={0}
            transition={'all 0.6s'}
            transform={`translateX(${
                !isMobileScreen ||
                (!isChannelsOpen && !isMessagesOpen) ||
                isChannelsOpen
                    ? '0%'
                    : '-100%'
            })`}
            flexGrow={1}
            h={'100%'}
            width={isMobileScreen ? '100%' : '40%'}>
            {isFetching && <MySpinner />}
            {isSuccess && (
                <>
                    <ScaleFade initialScale={0.7} in={true}>
                        <Flex gap={'10px'} p={'10px'} alignItems={'center'}>
                            <ControlMenu />
                        </Flex>
                        <Divider />
                    </ScaleFade>
                    <ChannelsPreview
                        handleSetActiveChannel={handleSetActiveChannel}
                        handleUserAction={handleUserAction}
                        channels={channels}
                        onOpen={onOpen}
                    />

                    <PopUp isOpen={isOpen} title={action!} onClose={onClose}>
                        <PopUpAction
                            onClose={onClose}
                            name={name}
                            id={id}
                            channels={channels}
                        />
                    </PopUp>
                    <CreateChannelButton
                        handleUserAction={handleUserAction}
                        onOpen={onOpen}
                    />
                </>
            )}
        </Stack>
    )
}
