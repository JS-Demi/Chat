import { ErrorBoundary, Provider } from '@rollbar/react' // Provider imports 'rollbar'
import React from 'react'

const rollbarConfig = {
	accessToken: 'af2fc603bef64d0f8b26c3c052c539ed',
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
			<ErrorBoundary>
				<TestError />
			</ErrorBoundary>
		</Provider>
	)
}
