import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../../Components/Layout'
import RoutesList from '../../Routes/RoutesList'

const App = () => (
	<>
		<div className='h-100'>
			<Layout />
			<RoutesList />
		</div>
		<ToastContainer />
	</>
)

export default App
