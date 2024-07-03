import { Button, ModalBody, ModalFooter } from '@chakra-ui/react'
import { useRemoveChannelMutation } from 'entities/channels/model'
import { FC } from 'react'
import { useTranslation } from '../../../../../node_modules/react-i18next'
import { toast } from 'react-toastify'
import { IPopUpProps } from 'shared/types'

export const RemoveChannel: FC<IPopUpProps> = ({ onClose, id }) => {
    const { t } = useTranslation()
    const [removeChannel, { isLoading }] = useRemoveChannelMutation()
    const onClick = () => {
        removeChannel(id)
            .unwrap()
            .then(() => {
                onClose()
                toast.success(t('toastify.successRemove'))
            })
    }
    return (
        <>
            <ModalBody>{t('popUp.confirmRemove')}</ModalBody>
            <ModalFooter>
                <Button
                    textTransform={'uppercase'}
                    colorScheme='red'
                    onClick={onClick}
                    isLoading={isLoading}>
                    {t('popUp.actions.remove')}
                </Button>
            </ModalFooter>
        </>
    )
}
