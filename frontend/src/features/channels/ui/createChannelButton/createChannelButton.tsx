import { AddIcon } from '@chakra-ui/icons'
import { IconButton, ScaleFade, Tooltip } from '@chakra-ui/react'
import { FC } from 'react'
import { useTranslation } from '../../../../../node_modules/react-i18next'
import { channelsActions } from 'shared/model/chatSlice'
interface ICreateChannel {
    handleUserAction: (action: channelsActions) => void
    onOpen: () => void
}

export const CreateChannelButton: FC<ICreateChannel> = ({
    handleUserAction,
    onOpen,
}) => {
    const { t } = useTranslation()

    return (
        <ScaleFade in={true} initialScale={0.7}>
            <Tooltip
                hasArrow
                label={t('chat.channels.createChannel')}
                color={'#000'}
                bg={'teal.100'}>
                <IconButton
                    onClick={() => {
                        handleUserAction(channelsActions.CREATE)
                        onOpen()
                    }}
                    colorScheme='teal'
                    position={'absolute'}
                    bottom={10}
                    isRound
                    right={'20%'}
                    h={'60px'}
                    w={'60px'}
                    fontSize={'lg'}
                    aria-label={t('chat.channels.createChannel')}
                    icon={<AddIcon fontSize={'1.2em'} />}
                />
            </Tooltip>
        </ScaleFade>
    )
}
