import React from 'react'
import Layout from '../../Components/Layout'
import RoutesList from '../../Routes/RoutesList'

const App = () => {
	return (
		<div className='d-flex flex-column h-100'>
			<Layout />
			<RoutesList />
		</div>
	)
}

export default App
