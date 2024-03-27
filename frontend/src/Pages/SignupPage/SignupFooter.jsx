import React from 'react';
import { Link } from 'react-router-dom';

const SignupFooter = () => (
	<div className='card-footer'>
		<div className='text-center'>
			<span>Уже есть аккаунт? </span>
			<Link to='/login'> Войти</Link>
		</div>
	</div>
);

export default SignupFooter;
