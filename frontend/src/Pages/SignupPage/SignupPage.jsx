import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
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
		username: Yup.string()
			.required(t('signup.errors.required'))
			.min(3, t('signup.errors.size'))
			.max(20, t('signup.errors.size'))
			.matches(/^\S+$/, t('signup.errors.spaces')),
		password: Yup.string().min(6, t('signup.errors.min')).required(t('signup.errors.required')).matches(/^\S+$/, t('signup.errors.spaces')),
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
			})
	}

	return (
		<>
			<div className='auth_box'>
				<div className='wrapper'>
					<div>
						<img src='/frontend/src/Assets/avatar.jpg' className='img img__circle' alt={t('signup.header')} />
					</div>
					<Formik
						initialValues={{ username: '', password: '', confirmPassword: '' }}
						validationSchema={signupSchema}
						onSubmit={handleSubmit}
					>
						{({ errors, touched, values }) => {
							return (
								<Form>
									<h1 className='title'>{t('signup.header')}</h1>
									<div className='form-floating mb-3'>
										<Field
											type='text'
											className='form-control'
											id='username'
											name='username'
											placeholder={t('signup.loginPlaceholder')}
											autoComplete='username'
										/>
										<label className='visually-hidden' htmlFor='username'>
											{t('signup.loginLabel')}
										</label>
										{touched.username && errors.username && <div className='login-error'>{errors.username}</div>}
									</div>
									<div className='form-floating'>
										<Field
											type='password'
											className='form-control'
											id='password'
											name='password'
											placeholder={t('signup.passwordPlaceholder')}
											autoComplete='off'
										/>
										<label className='visually-hidden' htmlFor='password'>
											{t('signup.passwordLabel')}
										</label>
										{touched.password && errors.password && <div className='login-error'>{errors.password}</div>}
									</div>
									<div className='form-floating'>
										<Field
											type='password'
											className='form-control'
											id='confirmPassword'
											name='confirmPassword'
											placeholder={t('signup.confirmPasswordPlaceholder')}
											autoComplete='off'
										/>
										<label className='visually-hidden' htmlFor='username'>
											{t('signup.confirmPasswordPlaceholder')}
										</label>
										{touched.confirmPassword && errors.confirmPassword && values.password && (
											<div className='login-error'>{errors.confirmPassword}</div>
										)}
										{conflictError && <div className='invalid'>{conflictError}</div>}
									</div>
									<button type='submit' className='btn btn-primary'>
										{t('signup.submit')}
									</button>
									<p>
										{t('signup.footer.text')}
										<Link to='/login'> {t('signup.footer.link')}</Link>
									</p>
								</Form>
							)
						}}
					</Formik>
				</div>
			</div>
		</>
	)
}

export default SignupPage
