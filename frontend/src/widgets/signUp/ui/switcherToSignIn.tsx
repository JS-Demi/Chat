import { Box, Button, Heading } from '@chakra-ui/react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LoginState } from 'shared/types'

interface ISwitcher {
    setActive: (active: LoginState) => void
}

export const Switcher: FC<ISwitcher> = ({ setActive }) => {
    const { t } = useTranslation()
    return (
        <Box className='overlay-panel overlay-left' gap='20px'>
            <Heading as={'h1'}>{t('login.switcher.header')}</Heading>
            <Box as='p' fontWeight={'bold'}>
                {t('login.switcher.body')}
            </Box>
            <Button
                colorScheme='inherit'
                variant={'outline'}
                onClick={() => setActive(LoginState.signIn)}>
                {t('login.switcher.btn')}
            </Button>
        </Box>
    )
}
