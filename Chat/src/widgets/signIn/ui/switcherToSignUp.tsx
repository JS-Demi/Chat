import { Box, Button, Heading } from '@chakra-ui/react'
import { FC } from 'react'
import { useTranslation } from '../../../../node_modules/react-i18next'
import { LoginState } from 'shared/types'

interface ISwitcher {
    setActive: (active: LoginState) => void
}

export const Switcher: FC<ISwitcher> = ({ setActive }) => {
    const { t } = useTranslation()
    return (
        <Box className='overlay-panel overlay-right' gap='20px'>
            <Heading as={'h1'}>{t('signup.switcher.header')}</Heading>
            <Box as='p' fontWeight={'bold'}>
                {t('signup.switcher.body')}
            </Box>
            <Button
                colorScheme='inherit'
                variant={'outline'}
                fontWeight={'bold'}
                size={['sm', null, 'md']}
                onClick={() => setActive(LoginState.singUp)}>
                {t('signup.switcher.btn')}
            </Button>
        </Box>
    )
}
