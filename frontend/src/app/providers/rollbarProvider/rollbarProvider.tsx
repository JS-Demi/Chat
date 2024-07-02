import { ErrorBoundary, Provider } from '@rollbar/react'
import { FC } from 'react'

interface IRollbarProvider {
    readonly children: JSX.Element
}

const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: import.meta.env.MODE,
}

export const RollbarProvider: FC<IRollbarProvider> = ({ children }) => {
    const isProd = import.meta.env.PROD
    return isProd ? (
        <Provider config={rollbarConfig}>
            <ErrorBoundary>{children}</ErrorBoundary>
        </Provider>
    ) : (
        children
    )
}
