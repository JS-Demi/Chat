import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './Components/App/App'
import { store } from './store/store'

const Init = () => {
	// const socket = io()
	// console.log('ini project')
	// socket.on('message', (message) => {
	// 	console.log(message)
	// })
	return (
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</React.StrictMode>
	)
}

export default Init
