import { HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import {
    Divider,
    IconButton,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaSquareGithub } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
import { useNavigate } from 'react-router'
import { ROUTES } from 'shared/constants'
import { useAuth } from 'shared/lib/auth'
interface IControlMenu {}

export const ControlMenu: FC<IControlMenu> = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { LOGIN } = ROUTES
    const { removeCredentials } = useAuth()
    const handleClick = () => {
        navigate(LOGIN)
        removeCredentials()
    }
    return (
        <Menu autoSelect={false} direction='ltr'>
            <MenuButton
                as={IconButton}
                colorScheme='teal'
                variant={'ghost'}
                aria-label='menu-options'
                fontSize={'25px'}
                icon={<HamburgerIcon />}></MenuButton>
            <MenuList fontWeight={'500'}>
                <MenuGroup
                    title={t('chat.channels.nav.profile')}
                    fontSize={'17px'}
                    fontWeight={'bold'}>
                    <MenuItem
                        fontWeight={'500'}
                        icon={<RepeatIcon color={'teal'} />}
                        onClick={handleClick}>
                        {t('chat.channels.nav.logout')}
                    </MenuItem>
                </MenuGroup>
                <Divider />
                <MenuGroup
                    title={t('chat.channels.nav.about')}
                    fontSize={'17px'}
                    fontWeight={'bold'}>
                    <MenuItem
                        as='a'
                        href='https://t.me/Miracle_JS'
                        target='_blank'
                        rel='noreferrer'
                        icon={<FaTelegramPlane color='#1C92D2' />}>
                        Telegram
                    </MenuItem>
                    <MenuItem
                        as='a'
                        href='https://github.com/JS-Demi'
                        target='_blank'
                        rel='noreferrer'
                        icon={<FaSquareGithub />}>
                        GitHub
                    </MenuItem>
                    <MenuItem
                        as={'a'}
                        href='mailto:dmt.ivanov96@gmail.com'
                        target='_blank'
                        rel='noreferrer'
                        icon={<SiGmail color='crimson' />}>
                        Mail
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}
