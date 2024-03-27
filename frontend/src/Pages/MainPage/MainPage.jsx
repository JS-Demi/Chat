import React from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAddChannelMutation } from '../../services/channelsApi'
import { useGetMessagesQuery } from '../../services/messagesApi'
import Channels from './Channels'
import MessagesForm from './MessagesForm'

const MainPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [addChannel] = useAddChannelMutation()

	const { refetch } = useGetMessagesQuery()

	const handleAddChannel = (text) => {
		const channel = { text }
		addChannel(channel)
	}

	return (
		<>
			<main className='container h-100 my-4 overflow-hidden rounded shadow'>
				<div className='row h-100 bg-white flex-md-row'>
					<div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
						<div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
							<b>Каналы</b>
							<button
								onClick={() => handleAddChannel('myChan')}
								type='button'
								className='p-0 text-primary btn btn-group-vertical'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									width='20'
									height='20'
									fill='currentColor'
								></svg>
								<span className=''>+</span>
							</button>
						</div>
						<ul className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
							<Channels />
						</ul>
					</div>
					<div className='messages col-8 col-md-10'>
						<MessagesForm />
					</div>
					<div
						id='messages-box'
						className='chat-messages'
					></div>
				</div>
			</main>
			<Outlet />
		</>
	)
}

export default MainPage
