import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="error-page">
      <section className="error-page__content wrapper">
        <h1 className="error-page__title">{t('errorPage.title')}</h1>
        <h2 className="error-page__subtitle">{t('errorPage.subtitle')}</h2>
        <p className="error-page__text">{t('errorPage.text')}</p>
        <Link className="error-page__btn btn btn--bg" to="/">
          {t('errorPage.link')}
        </Link>
      </section>
    </div>
  );
};

export default ErrorPage;
