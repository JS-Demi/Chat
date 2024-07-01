import React, { FC } from 'react'
import { ErrorBoundary, Provider } from '@rollbar/react'

interface IRollbarProvider {
	readonly children: JSX.Element
}

const rollbarConfig = {
	accessToken: import.meta.env.VITE_APP_ROLLBAR_ACCESS_TOKEN,
	environment: import.meta.env.VITE_APP_ENV_MODE,
}

export const RollbarProvider: FC<IRollbarProvider> = ({ children }) => {
	const isProd = import.meta.env.NODE_ENV === 'production'
	return isProd ? (
		<Provider config={rollbarConfig}>
			<ErrorBoundary>{children}</ErrorBoundary>
		</Provider>
	) : (
		children
	)
}
