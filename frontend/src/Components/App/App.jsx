import React from 'react'
// import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Layout from '../../Components/Layout'
// import RoutesList from '../../Routes/RoutesList'

import { ErrorBoundary, LEVEL_WARN, Provider } from '@rollbar/react' // Provider imports 'rollbar'

const rollbarConfig = {
	accessToken: 'aa1ce215c62e4caa9d16889c42a67a82',
	environment: 'testenv',
}

function TestError() {
	const a = null
	return a.hello()
}

// Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser
// ErrorBoundary catches all React errors in the tree below and logs them to Rollbar
export default function App() {
	return (
		<Provider config={rollbarConfig}>
			<ErrorBoundary
				level={LEVEL_WARN}
				errorMessage='Error in React render'
				extra={(error, info) => (info.componentStack.includes('Experimental') ? { experiment: true } : {})}
				fallbackUI={() => <p style={{ color: 'red' }}>Oops, there was an error.</p>}
			>
				<TestError />
			</ErrorBoundary>
		</Provider>
	)
}
// const App = () => {
// 	return (
// 		<>
// 			<div className='d-flex flex-column h-100'>
// 				<Layout />
// 				<RoutesList />
// 			</div>
// 			<ToastContainer />
// 		</>
// 	)
// }

// export default App
