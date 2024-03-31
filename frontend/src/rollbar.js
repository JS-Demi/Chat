import { ErrorBoundary, Provider } from '@rollbar/react' // Provider imports 'rollbar'
import React from 'react'

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
			<ErrorBoundary>
				<TestError />
			</ErrorBoundary>
		</Provider>
	)
}
