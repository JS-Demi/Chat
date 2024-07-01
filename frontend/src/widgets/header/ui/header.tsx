import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'shared/constants'

import { Box, Button, Flex, Heading, Image, Link } from '@chakra-ui/react'
import { useAuth } from 'shared/lib/auth'
import { FC } from 'react'

interface IHeader {}

export const Header: FC<IHeader> = () => {
    const { removeCredentials, username } = useAuth()
    const isLoggedIn = !!username
    const { LOGIN } = ROUTES

    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleLogout = () => {
        removeCredentials()
        navigate(LOGIN)
    }
    return (
        <Box
            as='header'
            overflow={'hidden'}
            minH={'5%'}
            boxShadow={'0 2px 4px 0 teal'}
            borderRadius={'5px'}>
            <Flex as={'nav'} justifyContent={'space-between'} m='10px'>
                <Link
                    href='https://openai.com/index/chatgpt/'
                    target='_blank'
                    _hover={'none'}>
                    <Flex alignItems={'center'}>
                        <Image
                            w={['60px', null, '70px']}
                            h={['60px', null, '70px']}
                            src='light-theme-logo.png'
                        />
                        <Heading as={'h1'} size='lg'>
                            {t('header.chatName')}
                        </Heading>
                    </Flex>
                </Link>
                {isLoggedIn && (
                    <Button
                        onClick={handleLogout}
                        variant={'outline'}
                        colorScheme='teal'>
                        {t('header.logout')}
                    </Button>
                )}
            </Flex>
        </Box>
    )
}
