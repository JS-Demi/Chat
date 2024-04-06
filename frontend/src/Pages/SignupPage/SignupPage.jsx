// prettier-ignore
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import logo from '../../assets/avatar_1.jpg';
import useAuth from '../../hooks/useAuth';
import { useCreateUserMutation } from '../../store/services/authenticationApi';

const SignupPage = () => {
  // use hook for navigate user
  const navigate = useNavigate();

  const { login } = useAuth();

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // create state for conflict error if user already exists
  const [conflictError, setConflictError] = useState(null);

  // use hook for i18n and create user
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { t } = useTranslation();

  // create schema for signup
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('signup.errors.required'))
      .min(3, t('signup.errors.size'))
      .max(20, t('signup.errors.size')),
    password: Yup.string().min(6, t('signup.errors.min')).required(t('signup.errors.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('signup.errors.match'))
      .required(t('signup.errors.match')),
  });

  // create handle for submit signup
  const handleSubmit = (values) => {
    createUser(values)
      .unwrap()
      .then((user) => {
        setConflictError(null);
        login(user);
        navigate('/');
      })
      .catch((error) => {
        if (error.status === 409) {
          setConflictError(t('signup.errors.alreadyExist'));
        }
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('toastify.fetchError'));
        }
      });
  };

  return (
    <div className="reg">
      <div className="reg__wrapper">
        <div>
          <img src={logo} className="img img__circle" alt={t('signup.header')} />
        </div>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <h1 className="title">{t('signup.header')}</h1>
              <div className="form-floating mb-3">
                <Field
                  type="text"
                  className={`form-control reg__wrapper__input ${
                    errors.username && touched.username ? 'is-invalid' : ''
                  }`}
                  innerRef={inputRef}
                  id="username"
                  name="username"
                  placeholder={t('signup.login')}
                  autoComplete="username"
                />
                <label htmlFor="username">{t('signup.login')}</label>
                <ErrorMessage component="div" className="invalid" name="username" />
              </div>
              <div className="form-floating">
                <Field
                  type="password"
                  className={`form-control reg__wrapper__input ${
                    errors.password && touched.password ? 'is-invalid' : ''
                  }`}
                  id="password"
                  name="password"
                  placeholder={t('signup.password')}
                  autoComplete="off"
                />
                <label htmlFor="password">{t('signup.password')}</label>
                <ErrorMessage component="div" className="invalid" name="password" />
              </div>
              <div className="form-floating">
                <Field
                  type="password"
                  className={`form-control reg__wrapper__input ${
                    errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t('signup.confirmPassword')}
                  autoComplete="off"
                />
                <label htmlFor="confirmPassword">{t('signup.confirmPassword')}</label>
                <ErrorMessage component="div" className="invalid" name="confirmPassword" />
                {conflictError && <div className="invalid">{conflictError}</div>}
              </div>
              <Button type="submit" disabled={isLoading} variant="primary">
                {t('signup.submit')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
