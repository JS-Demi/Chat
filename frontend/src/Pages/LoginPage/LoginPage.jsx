import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../../store/services/authenticationApi'
import '../SignupPage/SignupPage.scss'

const LoginForm = () => {
	const navigate = useNavigate()
	const [login, { isError }] = useLoginMutation()
	const { t } = useTranslation()

	const usernameInputRef = useRef(null)
	useEffect(() => {
		if (usernameInputRef.current) {
			usernameInputRef.current.focus()
		}
	}, [usernameInputRef])

	const handleLogin = async (values) => {
		login(values)
			.unwrap()
			.then((user) => {
				localStorage.setItem('access_token', user.token)
				localStorage.setItem('user', user.username)
				navigate('/')
				// subscribe()
			})
			.catch((err) => {
				if (err.status === 'FETCH_ERROR') {
					toast.error(t('toastify.fetchError'))
				}
				console.log(err.message)
			})
	}

	return (
		<>
			<div className='auth_box'>
				<div className='wrapper'>
					<div>
						<img src='/frontend/src/Assets/avatar1.jpg' className='img img__circle' alt={t('login.header')} />
					</div>
					<h1 className='title'>{t('login.header')}</h1>
					<Formik initialValues={{ username: '', password: '' }} onSubmit={handleLogin}>
						{() => {
							return (
								<Form>
									<div className='form-group'>
										<label className='visually-hidden' htmlFor='username'>
											{t('login.loginLabel')}
										</label>
										<Field
											type='text'
											name='username'
											autoComplete='username'
											placeholder={t('login.loginPlaceholder')}
											innerRef={usernameInputRef}
											className={isError ? 'form-control is-invalid' : 'form-control'}
										/>
									</div>
									<div className='form-group'>
										<label className='visually-hidden' htmlFor='password'>
											{t('login.passwordLabel')}
										</label>
										<Field
											placeholder={t('login.passwordPlaceholder')}
											type='password'
											name='password'
											autoComplete='current-password'
											className={isError ? 'form-control is-invalid' : 'form-control'}
										/>
										{isError && <div className='invalid-response'> {t('login.errors.wrongData')}</div>}
									</div>
									<button type='submit' className='btn btn-primary'>
										{t('login.submit')}
									</button>
									<p>
										{t('login.footer.text')}
										<Link to='/signup'> {t('login.footer.link')}</Link>
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

export default LoginForm
