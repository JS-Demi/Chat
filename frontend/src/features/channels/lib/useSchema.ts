import { useTranslation } from 'react-i18next'
import { IChannelResponse } from 'shared/types'
import * as Yup from 'yup'

export const useSchema = (channels: IChannelResponse[]) => {
    const { t } = useTranslation()
    const depends = channels.map(({ name }) => name)
    return Yup.object().shape({
        name: Yup.string()
            .min(3, t('popUp.errors.short'))
            .max(20, t('popUp.errors.long'))
            .notOneOf(depends, t('popUp.errors.match')),
    })
}
