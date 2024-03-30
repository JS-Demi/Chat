import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useCreateUserMutation } from '../../services/authenticationApi'
import './SignupPage.scss'

const SignupPage = () => {
	const navigate = useNavigate()
	const [createUser] = useCreateUserMutation()

	const signupSchema = Yup.object().shape({
		username: Yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
		password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Пароли должны совпадать')
			.required('Пароли должны совпадать'),
	})

	const handleSubmit = (values) => {
		createUser(values)
			.unwrap()
			.then(() => {
				console.log('user created')
				navigate('/login')
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<>
			<div className='auth_box'>
				<div className='wrapper'>
					<div>
						<img src='/frontend/src/Assets/avatar.jpg' className='img img__circle' alt='Регистрация' />
					</div>
					<Formik
						initialValues={{ username: '', password: '', confirmPassword: '' }}
						validationSchema={signupSchema}
						onSubmit={handleSubmit}
					>
						{({ errors, touched, values }) => {
							return (
								<Form>
									<h1 className='title'>Регистрация</h1>
									<div className='form-floating mb-3'>
										<Field
											type='text'
											className='form-control'
											id='username'
											name='username'
											placeholder='Имя пользователя'
											autoComplete='username'
										/>
										<label className='visually-hidden' htmlFor='username'>
											Имя пользователя
										</label>
										{touched.username && errors.username && <div className='login-error'>{errors.username}</div>}
									</div>
									<div className='form-floating'>
										<Field type='password' className='form-control' id='password' name='password' placeholder='Пароль' autoComplete='off' />
										<label className='visually-hidden' htmlFor='password'>
											Пароль
										</label>
										{touched.password && errors.password && <div className='login-error'>{errors.password}</div>}
									</div>
									<div className='form-floating'>
										<Field
											type='password'
											className='form-control'
											id='confirmPassword'
											name='confirmPassword'
											placeholder='Подтвердите пароль'
											autoComplete='off'
										/>
										<label className=' visually-hidden' htmlFor='username'>
											Повторите пароль
										</label>
										{touched.confirmPassword && errors.confirmPassword && values.password && (
											<div className='login-error'>{errors.confirmPassword}</div>
										)}
									</div>
									<button type='submit' className='btn btn-primary'>
										Зарегистрироваться
									</button>
									<p>
										Уже есть аккаунт?
										<Link to='/login'> Войти</Link>
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
