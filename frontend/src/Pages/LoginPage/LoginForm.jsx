import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../services/authenticationApi'

const LoginForm = () => {
	const navigate = useNavigate()
	const [login, { isError }] = useLoginMutation()

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
			.catch((err) => console.log(`something went wrong ${err}`))
	}

	return (
		<>
			<div>
				<img src='/frontend/src/Assets/avatar1.jpg' className='img img__circle' alt='Авторизация' />
			</div>
			<h1 className='title'>Войти</h1>
			<Formik initialValues={{ username: '', password: '' }} onSubmit={handleLogin}>
				{() => {
					return (
						<Form>
							<div className='form-group'>
								<label className='visually-hidden' htmlFor='username'>
									Имя пользователя
								</label>
								<Field
									type='text'
									name='username'
									autocomplete='username'
									placeholder='Имя пользователя'
									innerRef={usernameInputRef}
									className={isError ? 'form-control is-invalid' : 'form-control'}
								/>
							</div>
							<div className='form-group'>
								<label className='visually-hidden' htmlFor='password'>
									Пароль
								</label>
								<Field
									placeholder='Пароль'
									type='password'
									name='password'
									className={isError ? 'form-control is-invalid' : 'form-control'}
								/>
								{isError && <div className='invalid-response'> Неверные имя пользователя или пароль</div>}
							</div>
							<button type='submit' className='btn btn-primary'>
								Войти
							</button>
							<p>
								Нет Аккаунта?
								<Link to='/signup'> Регистрация</Link>
							</p>
						</Form>
					)
				}}
			</Formik>
		</>
	)
}

export default LoginForm
