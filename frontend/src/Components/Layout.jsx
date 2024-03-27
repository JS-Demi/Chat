import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Layout = () => {
	// get access data
	const isLoggedIn = useAuth()

	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('user')
		navigate('/login')
		console.log('logout')
	}
	return (
		<>
			<nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
				<div className='container'>
					<Link
						to={'/'}
						className='navbar-brand'
					>
						Friendly Chat
					</Link>
					{!!isLoggedIn && (
						<button
							onClick={handleLogout}
							className='btn btn-primary'
							type='button'
						>
							Выйти
						</button>
					)}
				</div>
			</nav>
			<Outlet />
		</>
	)
}

export default Layout
