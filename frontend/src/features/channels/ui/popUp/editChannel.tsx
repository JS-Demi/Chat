import { Button, ModalFooter } from '@chakra-ui/react'
import { useRenameChannelMutation } from 'entities/channels/model'
import * as filter from 'leo-profanity'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { IFormikValues, PopUpForm } from './popUpForm/PopUpForm'
import { IPopUpProps } from 'shared/types'

export const EditChannel: FC<IPopUpProps> = ({
    onClose,
    name,
    id,
    channels,
}) => {
    const { t } = useTranslation()
    const [renameChannel, { isLoading }] = useRenameChannelMutation()
    filter.loadDictionary('ru')
    const onSubmit = ({ name }: IFormikValues) => {
        const filteredName = filter.clean(name)
        renameChannel({ name: filteredName, id })
            .unwrap()
            .then(() => {
                onClose()
                toast.success(t('toastify.successRename'))
            })
    }
    return (
        <PopUpForm onSubmit={onSubmit} name={name} channels={channels}>
            <ModalFooter>
                <Button isLoading={isLoading} type='submit' colorScheme='teal'>
                    {t('popUp.actions.rename')}
                </Button>
            </ModalFooter>
        </PopUpForm>
    )
}
