import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import subscribe from '../../hooks/useSocket'
import { useLoginMutation } from '../../services/authenticationApi'

const LoginForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [login, { isError }] = useLoginMutation()

	const handleLogin = async (values, { setSubmitting }) => {
		login(values)
			.unwrap()
			.then((user) => {
				localStorage.setItem('access_token', user.token)
				localStorage.setItem('user', user.username)
				navigate('/')
				subscribe()
			})
			.catch((err) => console.log(`something went wrong ${err}`))
	}

	return (
		<>
			<div className='loginBox'>
				<Formik
					initialValues={{ username: '', password: '' }}
					onSubmit={handleLogin}
				>
					{() => {
						return (
							<Form>
								<div className='form-group'>
									<label htmlFor='username'>Имя пользователя</label>
									<Field
										type='text'
										name='username'
										className={isError ? 'form-control is-invalid' : 'form-control'}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='password'>Пароль</label>
									<Field
										type='password'
										name='password'
										className={isError ? 'form-control is-invalid' : 'form-control'}
									/>
									{isError && (
										<div className='invalid-response'> Неверные имя пользователя или пароль</div>
									)}
								</div>
								<button
									type='submit'
									className='btn btn-primary'
								>
									Войти
								</button>
							</Form>
						)
					}}
				</Formik>
			</div>
		</>
	)
}

export default LoginForm
