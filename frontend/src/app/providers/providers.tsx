import { Fallback } from 'shared/ui/fallback'
import { ChakraProvider } from '@chakra-ui/react'
import { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import store, { persistor } from 'app/store'
import { RollbarProvider } from './rollbarProvider'
import { I18nextProvider } from '../../../node_modules/react-i18next'
import { i18n } from 'shared/config/i18n'
import { theme } from './theme'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

interface IProviders {
    readonly children: JSX.Element
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={Fallback}>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <RollbarProvider>
                        <PersistGate loading={null} persistor={persistor}>
                            <ChakraProvider theme={theme}>
                                {children}
                            </ChakraProvider>
                        </PersistGate>
                    </RollbarProvider>
                    <ToastContainer />
                </I18nextProvider>
            </Provider>
        </ErrorBoundary>
    )
}
