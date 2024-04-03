import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import logo from '../../Assets/avatar_1.jpg'
import { useCreateUserMutation } from '../../store/services/authenticationApi'
import './SignupPage.scss'

const SignupPage = () => {
	// use hook for navigate user
	const navigate = useNavigate()

	// create state for conflict error if user already exists
	const [conflictError, setConflictError] = useState(null)

	// use hook for i18n and create user
	const [createUser] = useCreateUserMutation()
	const { t } = useTranslation()

	// create schema for signup
	const signupSchema = Yup.object().shape({
		username: Yup.string().required(t('signup.errors.required')).min(3, t('signup.errors.size')).max(20, t('signup.errors.size')),
		password: Yup.string().min(6, t('signup.errors.min')).required(t('signup.errors.required')),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], t('signup.errors.match'))
			.required(t('signup.errors.match')),
	})

	// create handle for submit signup
	const handleSubmit = (values) => {
		createUser(values)
			.unwrap()
			.then((res) => {
				setConflictError(null)
				localStorage.setItem('access_token', res.token)
				localStorage.setItem('user', res.username)
				navigate('/')
			})
			.catch((error) => {
				console.log(error)
				if (error.status === 409) {
					setConflictError(t('signup.errors.alreadyExist'))
				}
				if (error.status === 'FETCH_ERROR') {
					toast.error(t('toastify.fetchError'))
				}
			})
	}

	return (
		<div className='reg'>
			<div className='reg__wrapper'>
				<div>
					<img src={logo} className='img img__circle' alt={t('signup.header')} />
				</div>
				<Formik initialValues={{ username: '', password: '', confirmPassword: '' }} validationSchema={signupSchema} onSubmit={handleSubmit}>
					{({ errors, touched }) => (
						<Form>
							<h1 className='title'>{t('signup.header')}</h1>
							<div className='form-floating mb-3'>
								<Field
									type='text'
									className={`form-control reg__wrapper__input ${errors.username && touched.username ? 'is-invalid' : ''}`}
									id='username'
									name='username'
									placeholder={t('signup.login')}
									autoComplete='username'
								/>
								<label htmlFor='username'>{t('signup.login')}</label>
								<ErrorMessage component='div' className='invalid' name='username' />
							</div>
							<div className='form-floating'>
								<Field
									type='password'
									className={`form-control reg__wrapper__input ${errors.password && touched.password ? 'is-invalid' : ''}`}
									id='password'
									name='password'
									placeholder={t('signup.password')}
									autoComplete='off'
								/>
								<label htmlFor='password'>{t('signup.password')}</label>
								<ErrorMessage component='div' className='invalid' name='password' />
							</div>
							<div className='form-floating'>
								<Field
									type='password'
									className={`form-control reg__wrapper__input ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
									id='confirmPassword'
									name='confirmPassword'
									placeholder={t('signup.confirmPassword')}
									autoComplete='off'
								/>
								<label htmlFor='confirmPassword'>{t('signup.confirmPassword')}</label>
								<ErrorMessage component='div' className='invalid' name='confirmPassword' />
								{conflictError && <div className='invalid'>{conflictError}</div>}
							</div>
							<button type='submit' className='btn btn-primary'>
								{t('signup.submit')}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default SignupPage
