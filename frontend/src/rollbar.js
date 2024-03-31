import { ErrorBoundary, Provider } from '@rollbar/react'
import React from 'react'

const rollbarConfig = {
	accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
	environment: 'testenv',
	captureUncaught: true,
	captureUnhandledRejections: true,
}

export default function RollbarProvider({ children }) {
	return (
		<Provider config={rollbarConfig}>
			<ErrorBoundary
				level='critical'
				errorMessage='example error boundary message'
				fallbackUI={() => <p style={{ color: 'red' }}>Oops, there was an error.</p>}
			>
				{children}
			</ErrorBoundary>
		</Provider>
	)
}
