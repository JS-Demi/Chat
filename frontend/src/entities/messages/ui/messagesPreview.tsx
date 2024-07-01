import {
    Avatar,
    Box,
    Flex,
    List,
    ListItem,
    ScaleFade,
    Text,
} from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { useAuth } from 'shared/lib/auth'
import { useResize } from 'shared/lib/resize'
import { IMessage } from 'shared/types'
import { getRandomColor } from '../lib/'

interface IMessagesPreview {
    messages: IMessage[]
}

export const MessagesPreview: FC<IMessagesPreview> = ({ messages }) => {
    const { username: currentUser } = useAuth()
    useEffect(() => {
        const messagesContainer =
            document.getElementById('messages-container')?.lastElementChild
        messagesContainer?.scrollIntoView()
    }, [messages?.length])
    const { isMobileScreen } = useResize()

    return (
        <List
            px={isMobileScreen ? '10px' : '40px'}
            overflow={'auto'}
            flexGrow={'1'}
            id='messages-container'
            display={'flex'}
            width={'100%'}
            position={'relative'}
            flexDirection={'column'}
            gap={'5px'}
            pt='10px'>
            {messages?.map(({ body, id, username }) => {
                const isCurrentUser = currentUser === username
                return (
                    <ListItem
                        key={id}
                        maxW='80%'
                        position='relative'
                        alignSelf={isCurrentUser ? 'flex-end' : 'flex-start'}>
                        <ScaleFade initialScale={0.7} in={true}>
                            <Flex gap={'5px'}>
                                {!isCurrentUser && (
                                    <Avatar
                                        mt={'auto'}
                                        id={username}
                                        name={username}
                                        color={'#fff'}
                                        bgColor={getRandomColor(username)}
                                    />
                                )}
                                <Box
                                    borderRadius={
                                        isCurrentUser
                                            ? '15px 15px 5px 15px'
                                            : '15px 15px 15px 5px'
                                    }
                                    bgColor={
                                        isCurrentUser ? 'teal.100' : '#fff'
                                    }
                                    p='5px 10px'>
                                    {!isCurrentUser && (
                                        <Text
                                            as={'p'}
                                            fontWeight={'bold'}
                                            color={getRandomColor(username)}
                                            pr={'5px'}>
                                            {username}
                                        </Text>
                                    )}
                                    <Text as={'p'} fontWeight={'500'}>
                                        {body}
                                    </Text>
                                </Box>
                            </Flex>
                        </ScaleFade>
                    </ListItem>
                )
            })}
        </List>
    )
}
