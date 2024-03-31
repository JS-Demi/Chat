import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PopUpLayout from '../../Components/PopUps/PopUpLayout'
import Channels from './Channels/Channels'
import MessagesForm from './Messages/MessagesForm'
import './mainpage.scss'

const MainPage = () => {
	// create state
	const [modalInfo, setModalInfo] = useState({ type: null, id: null })
	const [activeChannel, setActiveChannel] = useState({ id: 1, name: 'General' })
	// use hook for i18n
	const { t } = useTranslation()

	// create handles for state our modals
	const handleClose = () => setModalInfo({ type: null, id: null })
	const handleUserAction =
		(type) =>
		({ currentTarget }) => {
			const { id } = currentTarget?.dataset
			setModalInfo({ type, id })
		}

	return (
		<div className='container h-100 my-4 overflow-hidden rounded shadow'>
			<div className='row h-100 bg-white flex-md-row'>
				<div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
					<div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
						<b>{t('chat.channels.header')}</b>
						<button
							type='button'
							className='btn btn-primary'
							onClick={() => {
								throw new Error('testError')
							}}
						>
							testError
						</button>
						<button
							data-id={null}
							onClick={handleUserAction('addChannel')}
							type='button'
							className='p-0 text-primary btn btn-group-vertical'
						>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>
								<path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'></path>
								<path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'></path>
							</svg>
							<span className='visually-hidden'>{t('chat.channels.createChannel')}</span>
						</button>
					</div>
					<ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
						<Channels handleUserAction={handleUserAction} setActiveChannel={setActiveChannel} activeChannel={activeChannel} />
					</ul>
				</div>
				<div className='col p-0 h-100'>
					<div className='d-flex flex-column h-100'>
						<MessagesForm activeChannel={activeChannel} />
					</div>
				</div>
				<PopUpLayout modalInfo={modalInfo} handleClose={handleClose} setActiveChannel={setActiveChannel} />
			</div>
		</div>
	)
}

export default MainPage
