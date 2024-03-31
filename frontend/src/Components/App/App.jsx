import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../../Components/Layout'
import RoutesList from '../../Routes/RoutesList'

const App = () => {
	return (
		<>
			<div className='d-flex flex-column h-100'>
				<Layout />
				<RoutesList />
			</div>
			<ToastContainer />
		</>
	)
}

export default App
