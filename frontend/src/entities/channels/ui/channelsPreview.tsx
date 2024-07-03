import {
    Avatar,
    Box,
    Button,
    Icon,
    List,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    ScaleFade,
    Stack,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useTranslation } from '../../../../node_modules/react-i18next'
import { MdEdit } from 'react-icons/md'
import { useAppSelector } from 'shared/lib/store'
import { channelsActions, selectActiveChannel } from 'shared/model/chatSlice'
import { IChannelResponse } from 'shared/types'
import { LastMessageOfChanel } from './lastMessageOfChanel'

interface IChannelsPreview {
    readonly handleUserAction: (
        action: channelsActions,
        id?: string,
        name?: string
    ) => void
    readonly handleSetActiveChannel: (id: string, name: string) => () => void
    readonly channels: IChannelResponse[]
    readonly onOpen: () => void
}

export const ChannelsPreview: FC<IChannelsPreview> = ({
    handleSetActiveChannel,
    handleUserAction,
    channels,
    onOpen,
}) => {
    const { t } = useTranslation()
    const { id: activeChannelId } = useAppSelector(selectActiveChannel)

    return (
        <List overflow={'auto'} flexGrow={1}>
            {channels.map(({ id, name, removable }) => {
                return (
                    <ListItem key={id} px={'5px'}>
                        <ScaleFade initialScale={0.7} in={true}>
                            <Button
                                onClick={handleSetActiveChannel(id, name)}
                                variant={'ghost'}
                                h='72px'
                                justifyContent={'space-between'}
                                color={'black'}
                                w='100%'
                                p={0}
                                px='5px'
                                colorScheme='teal'
                                isActive={id === activeChannelId}>
                                <Avatar
                                    fontWeight={'bold'}
                                    name={name}></Avatar>
                                <Stack
                                    flexGrow={1}
                                    textAlign={'start'}
                                    pl={'10px'}
                                    overflow={'hidden'}
                                    textOverflow={'ellipsis'}
                                    whiteSpace={'nowrap'}>
                                    <Box
                                        as='p'
                                        fontWeight={'bold'}>{`${name}`}</Box>
                                    <LastMessageOfChanel channelId={id} />
                                </Stack>
                                <Popover trigger={'hover'}>
                                    <PopoverTrigger>
                                        <Box
                                            position={'relative'}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                            }}>
                                            <Icon
                                                opacity={removable ? 1 : 0}
                                                pointerEvents={
                                                    removable ? 'all' : 'none'
                                                }
                                                as={MdEdit}
                                                fontSize={'25px'}
                                                aria-label='channel-options'
                                                color='teal'></Icon>
                                        </Box>
                                    </PopoverTrigger>
                                    <PopoverContent width={'150px'}>
                                        <PopoverArrow />
                                        <Button
                                            colorScheme='teal'
                                            variant={'ghost'}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleUserAction(
                                                    channelsActions.EDIT,
                                                    id,
                                                    name
                                                )
                                                onOpen()
                                            }}>
                                            {t('chat.channels.actionRename')}
                                        </Button>
                                        <Button
                                            colorScheme='teal'
                                            variant={'ghost'}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleUserAction(
                                                    channelsActions.REMOVE,
                                                    id
                                                )
                                                onOpen()
                                            }}>
                                            {t('chat.channels.actionRemove')}
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </Button>
                        </ScaleFade>
                    </ListItem>
                )
            })}
        </List>
    )
}
