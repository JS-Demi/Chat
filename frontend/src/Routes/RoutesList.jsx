import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage'
import LoginPage from '../Pages/LoginPage'
import MainPage from '../Pages/MainPage'

const RoutesList = () => {
	const isLoggedIn = localStorage.getItem('access_token')

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={isLoggedIn ? <MainPage /> : <Navigate to='/login' />}
				/>
				<Route
					path='/login'
					element={isLoggedIn ? <Navigate to='/' /> : <LoginPage />}
				/>
				<Route
					path='*'
					element={<ErrorPage />}
				/>
			</Routes>
		</>
	)
}

export default RoutesList
