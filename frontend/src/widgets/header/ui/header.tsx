import { useTranslation } from '../../../../node_modules/react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'shared/constants'
import logo from 'shared/assets/images/Circle-logo.png'

import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react'
import { FC } from 'react'
import { useAuth } from 'shared/lib/auth'

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
            bgColor={'#f8f8f8'}
            p={'10px'}
            boxShadow={'0 2px 4px 0 teal'}
            borderRadius={'5px'}>
            <Flex as={'nav'} justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={'10px'} mb={'10px'}>
                    <Image
                        w={['60px', null, '70px']}
                        h={['60px', null, '70px']}
                        src={logo}
                    />
                    <Heading as={'h1'} size='lg'>
                        {t('header.chatName')}
                    </Heading>
                </Flex>
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
