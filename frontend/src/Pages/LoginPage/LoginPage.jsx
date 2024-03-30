import React from 'react'
import '../SignupPage/SignupPage.scss'
import LoginForm from './LoginForm'

const LoginPage = () => {
	return (
		<div className='auth_box'>
			<div className='wrapper'>
				<LoginForm />
			</div>
		</div>
	)
}

export default LoginPage
