import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import LoginPage from '../Pages/LoginPage/LoginPage'
import MainPage from '../Pages/MainPage/MainPage'
import SignupPage from '../Pages/SignupPage/SignupPage'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ children }) => {
	const access = useAuth()

	return access ? children : <Navigate to='/login' />
}

const RoutesList = () => {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<PrivateRoute>
							<MainPage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/login'
					element={<LoginPage />}
				/>
				<Route
					path='/signup'
					element={<SignupPage />}
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
