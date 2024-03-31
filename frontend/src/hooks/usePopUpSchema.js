import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useGetChannelsQuery } from '../store/services/channelsApi'

export const usePopUpSchema = () => {
	const { t } = useTranslation()
	const { data } = useGetChannelsQuery()
	const depends = data.map(({ name }) => name)
	return Yup.object().shape({
		name: Yup.string().min(3, t('popUp.errors.min')).max(20, t('popUp.errors.max')).notOneOf(depends, t('popUp.errors.match')),
	})
}
