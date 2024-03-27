import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useCreateUserMutation } from '../../services/authenticationApi'
import SignupFooter from './SignupFooter'

const SignupPage = () => {
	const navigate = useNavigate()
	const [createUser] = useCreateUserMutation()

	const signupSchema = Yup.object().shape({
		username: Yup.string()
			.required('Обязательное поле')
			.min(3, 'От 3 до 20 символов')
			.max(20, 'От 3 до 20 символов'),
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
			<Formik
				initialValues={{ username: '', password: '', confirmPassword: '' }}
				validationSchema={signupSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched, values }) => {
					return (
						<Form>
							<h1 className='text-center'>Регистрация</h1>
							<div className='form-floating mb-3'>
								<Field
									type='text'
									className='form-control'
									id='username'
									name='username'
									placeholder='От 3 до 20 символов'
									autoComplete='username'
								/>
								<label
									className='form-label'
									htmlFor='username'
								>
									Имя пользователя
								</label>
								{touched.username && errors.username && (
									<div className='login-error'>{errors.username}</div>
								)}
							</div>
							<div className='form-floating'>
								<Field
									type='password'
									className='form-control'
									id='password'
									name='password'
									placeholder='Не менее 6 символов'
									autoComplete='off'
								/>
								<label htmlFor='password'>Пароль</label>
								{touched.password && errors.password && (
									<div className='login-error'>{errors.password}</div>
								)}
							</div>
							<div className='form-floating'>
								<Field
									type='password'
									className='form-control'
									id='confirmPassword'
									name='confirmPassword'
									placeholder='Пароли должны совпадать'
									autoComplete='off'
								/>
								<label htmlFor='username'>Повторите пароль</label>
								{touched.confirmPassword && errors.confirmPassword && values.password && (
									<div className='login-error'>{errors.confirmPassword}</div>
								)}
							</div>
							<button
								type='submit'
								className='btn btn-primary'
							>
								Зарегистрироваться
							</button>
						</Form>
					)
				}}
			</Formik>
			<SignupFooter />
		</>
	)
}

export default SignupPage
