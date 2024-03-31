import { ErrorBoundary, Provider } from '@rollbar/react'
import React from 'react'

const rollbarConfig = {
	accessToken: 'af2fc603bef64d0f8b26c3c052c539ed',
	environment: 'testenv',
}

function TestError() {
	const a = null
	return a.hello()
}
export default function RollbarProvider({ children }) {
	return (
		<Provider config={rollbarConfig}>
			<ErrorBoundary>
				<TestError />
				{children}
			</ErrorBoundary>
		</Provider>
	)
}
