import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MainPage = () => {
	const dispatch = useDispatch()
	// dispatch(setCredentials({ username: 'test', token: 'test' }))
	const user = useSelector((state) => state.auth)
	console.log(user)
	return (
		<div className='container'>
			<h1>Hello, mainPage!</h1>
			<h2>Welcome to mainPage!</h2>
		</div>
	)
}

export default MainPage
