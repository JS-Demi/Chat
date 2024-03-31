import { Field, Form, Formik } from 'formik'
import React, { useRef } from 'react'
import { useGetMessagesQuery, useSendMessageMutation } from '../../../services/messagesApi'

const Messages = ({ activeChannel }) => {
	// get user's token
	// const userAccessToken = localStorage.getItem('access_token')

	// get messages from store
	const { data: messages, refetch } = useGetMessagesQuery()
	console.log(messages)
	// get username
	const username = localStorage.getItem('user')

	const inputRef = useRef(null)

	const [sendMessage] = useSendMessageMutation()

	const { id: activeChannelId, name } = activeChannel

	// send message to channel
	const handleSendMessage = ({ body }, { resetForm }) => {
		const message = { body, channelId: activeChannelId, username }

		sendMessage(message)
			.unwrap()
			.then(() => {})
			.catch((error) => console.log(error))
		resetForm()
		inputRef.current.focus()
	}

	const countMessages = messages ? messages.filter((msg) => msg.channelId === activeChannelId).length : 0

	return (
		<>
			<div className='bg-light mb-4 p-3 shadow-sm small'>
				<p className='m-0'>
					<b># {name}</b>
				</p>
				<span className='text-muted'>{`${countMessages} сообщений`}</span>
			</div>

			<div id='messages-box' className='chat-messages overflow-auto px-5 '>
				{messages?.map(({ username, body, channelId, id }) => {
					return (
						activeChannelId === channelId && (
							<div key={id} className='text-break mb-2'>
								<b>{username}</b>: {body}
							</div>
						)
					)
				})}
			</div>
			<div className='mt-auto px-5 py-3'>
				<Formik initialValues={{ body: '' }} onSubmit={handleSendMessage}>
					{({ values }) => {
						const isDisabled = !values.body
						return (
							<Form className='py-1 border rounded-2'>
								<div className='input-group has-validation'>
									<Field
										className='border-0 p-0 ps-2 form-control'
										innerRef={inputRef}
										type='text'
										name='body'
										aria-label='Новое сообщение'
										placeholder='Введите сообщение...'
									/>
									<button disabled={isDisabled} type='submit' className='btn btn-group-vertical'>
										<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 16' width='20' height='20' fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z'
											></path>
										</svg>
										<span className='visually-hidden'>Отправить</span>
									</button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</div>
		</>
	)
}

export default Messages