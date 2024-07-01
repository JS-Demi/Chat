import { Button, ModalFooter } from '@chakra-ui/react'
import { useCreateChannelMutation } from 'entities/channels/model'
import * as filter from 'leo-profanity'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { IFormikValues, PopUpForm } from './popUpForm/PopUpForm'
import { IPopUpProps } from 'shared/types'

export const CreateChannel: FC<IPopUpProps> = ({ onClose, channels }) => {
    const [createChannel, { isLoading }] = useCreateChannelMutation()
    const { t } = useTranslation()
    filter.loadDictionary('ru')

    const onSubmit = (values: IFormikValues) => {
        const filteredName = filter.clean(values.name)
        createChannel({ ...values, name: filteredName })
            .unwrap()
            .then(() => {
                onClose()
                toast.success(t('toastify.successCreate'))
            })
    }
    return (
        <PopUpForm onSubmit={onSubmit} channels={channels}>
            <ModalFooter>
                <Button isLoading={isLoading} type='submit' colorScheme='teal'>
                    {t('popUp.actions.create')}
                </Button>
            </ModalFooter>
        </PopUpForm>
    )
}
