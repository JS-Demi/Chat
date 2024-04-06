import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/avatar.jpg';
import useAuth from '../../hooks/useAuth';
import { useLoginMutation } from '../../store/services/authenticationApi';

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isError, isLoading }] = useLoginMutation();
  const { t } = useTranslation();
  const { login: enter } = useAuth();

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleLogin = async (values) => {
    login(values)
      .unwrap()
      .then((user) => {
        enter(user);
        navigate('/');
      })
      .catch((err) => {
        if (err.status === 'FETCH_ERROR') {
          toast.error(t('toastify.fetchError'));
        }
      });
  };

  return (
    <div className="log">
      <div className="log__wrapper">
        <div>
          <img src={logo} className="img img__circle" alt={t('login.header')} />
        </div>

        <Formik initialValues={{ username: '', password: '' }} onSubmit={handleLogin}>
          {() => (
            <Form>
              <h1 className="title">{t('login.header')}</h1>
              <div className="form-floating mb-3">
                <Field
                  type="text"
                  required
                  name="username"
                  id="username"
                  autoComplete="username"
                  placeholder={t('login.login')}
                  innerRef={inputRef}
                  className={`form-control log__wrapper__input ${isError ? 'is-invalid' : ''}`}
                />
                <label htmlFor="username">{t('login.login')}</label>
              </div>
              <div className="form-floating mb-3">
                <Field
                  placeholder={t('login.password')}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  className={`form-control log__wrapper__input ${isError ? 'is-invalid' : ''}`}
                />
                <label htmlFor="password">{t('login.password')}</label>
                {isError && <div className="invalid">{t('login.errors.wrongData')}</div>}
              </div>
              <Button type="submit" disabled={isLoading} variant="primary">
                {t('login.submit')}
              </Button>
            </Form>
          )}
        </Formik>
        <div className="log__wrapper__footer">
          <div className="text-center">
            <span>{t('login.footer.text')}</span>
            <Link to="/signup">{t('login.footer.link')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
