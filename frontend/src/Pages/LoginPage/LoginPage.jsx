import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../../Assets/avatar.jpg'
import { useLoginMutation } from '../../store/services/authenticationApi'
import './login.scss'

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
			<div className='log'>
				<div className='log__wrapper'>
					<div>
						<img src={logo} className='img img__circle' alt={t('login.header')} />
					</div>

					<Formik initialValues={{ username: '', password: '' }} onSubmit={handleLogin}>
						{() => {
							return (
								<Form>
									<h1 className='title'>{t('login.header')}</h1>
									<div className='form-floating mb-3'>
										<Field
											type='text'
											name='username'
											autoComplete='username'
											placeholder={t('login.login')}
											innerRef={usernameInputRef}
											className={`form-control log__wrapper__input ${isError ? 'is-invalid' : ''}`}
										/>
										<label htmlFor='username'>{t('login.login')}</label>
									</div>
									<div className='form-floating mb-3'>
										<Field
											placeholder={t('login.password')}
											type='password'
											name='password'
											autoComplete='current-password'
											className={`form-control log__wrapper__input ${isError ? 'is-invalid' : ''}`}
										/>
										<label htmlFor='password'>{t('login.password')}</label>
										{isError && <span className='invalid'> {t('login.errors.wrongData')}</span>}
									</div>
									<button type='submit' className='btn btn-primary'>
										{t('login.submit')}
									</button>
								</Form>
							)
						}}
					</Formik>
					<div className='log__wrapper__footer'>
						<div className='text-center'>
							<span>{t('login.footer.text')}</span>
							<Link to='/signup'> {t('login.footer.link')}</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginForm
