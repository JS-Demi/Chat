import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../services/loginApi'
import { setCredentials } from '../store/slices/authSlice'

const LoginPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [login, { error }] = useLoginMutation()
	const [user1, setUser] = useState({ username: 'start', token: 'start' })

	const handleLogin = async (values, { setSubmitting }) => {
		try {
			const user = await login(values).unwrap()
			localStorage.setItem('access_token', user.token)
			localStorage.setItem('user', user.username)
			dispatch(setCredentials(user))
			navigate('/')
		} catch (err) {
			console.log('not successful login')
		}
	}
	const data = useSelector((state) => state.auth)
	console.log(data)

	return (
		<div className='loginBox'>
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={handleLogin}
			>
				{({ values }) => {
					console.log(values)
					return (
						<Form>
							<div className='form-group'>
								<label htmlFor='username'>Имя пользователя</label>
								<Field
									type='text'
									name='username'
									className='form-control'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Пароль</label>
								<Field
									type='password'
									name='password'
									className='form-control'
								/>
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
	)
}

export default LoginPage
