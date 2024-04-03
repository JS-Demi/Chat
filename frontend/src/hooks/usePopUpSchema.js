import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useGetChannelsQuery } from '../store/services/channelsApi';

export const usePopUpSchema = () => {
  const { t } = useTranslation();
  const { data } = useGetChannelsQuery();
  const depends = data.map(({ name }) => name);
  return Yup.object().shape({
    name: Yup.string()
      .required(t('popUp.errors.required'))
      .min(3, t('popUp.errors.size'))
      .max(20, t('popUp.errors.size'))
      .notOneOf(depends, t('popUp.errors.match')),
  });
};

export default usePopUpSchema;
