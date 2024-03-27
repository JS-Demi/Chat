import React from 'react'
import { Link } from 'react-router-dom'

const LoginFooter = () => (
	<div className='card-footer'>
		<div className='text-center'>
			<span>Нет Аккаунта? </span>
			<Link to='/signup'> Регистрация</Link>
		</div>
	</div>
)

export default LoginFooter
