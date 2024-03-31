import i18next from 'i18next'
import * as filter from 'leo-profanity'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './Components/App/App'
import resources from './locales'
import RollbarProvider from './rollbar'
import { store } from './store/store'

const Init = async () => {
	// init leo dictionary for ru language
	filter.add(filter.getDictionary('ru'))
	// create i18next instance
	const i18n = i18next.createInstance()
	// init i18next
	try {
		await i18n.use(initReactI18next).init({
			fallbackLng: 'ru',
			resources,
		})
	} catch (err) {
		console.log(`${err} i18next`)
	}

	return (
		<Provider store={store}>
			<I18nextProvider i18n={i18n}>
				<BrowserRouter>
					<RollbarProvider>
						<App />
					</RollbarProvider>
				</BrowserRouter>
			</I18nextProvider>
		</Provider>
	)
}

export default Init
