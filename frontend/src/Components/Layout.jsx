import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
	const isLoggedIn = localStorage.getItem('access_token')

	const handleLogout = () => {
		localStorage.removeItem('access_token')
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
