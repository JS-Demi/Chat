import i18next from 'i18next'
import React from 'react'
import { initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './Components/App/App'
import resources from './locales'
import { store } from './store/store'

const Init = async () => {
	try {
		i18next.use(initReactI18next).init({
			fallbackLng: 'ru',
			resources,
			interpolation: {
				escapeValue: false,
			},
		})
	} catch (err) {
		console.log('Ошибка инициализации i18next')
		console.log(err)
	}

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
