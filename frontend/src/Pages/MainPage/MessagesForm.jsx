import { Field, Form, Formik } from 'formik'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useGetMessagesQuery, useSendMessageMutation } from '../../services/messagesApi'

const Messages = () => {
	// get user's token
	// const userAccessToken = localStorage.getItem('access_token')

	// get messages from store
	const { data: messages, refetch } = useGetMessagesQuery()

	// get activeChannel data from store
	const { name, id: activeChannelId } = useSelector((state) => state.common.activeChannel)

	// get username
	const username = localStorage.getItem('user')

	const inputRef = useRef(null)

	const [sendMessage] = useSendMessageMutation()

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

	const countMessages = messages
		? messages.filter((msg) => msg.channelId === activeChannelId).length
		: 0

	return (
		<div className='message-container'>
			<div className='messages__header'>
				<p className=''>
					<b># {name}</b>
				</p>
				<span className='text-muted'>{`${countMessages} сообщений`}</span>
			</div>
			<div
				id='messages-box'
				className='chat-messages overflow-auto'
			>
				{messages?.map(({ username, body, channelId, id }) => {
					return (
						activeChannelId === channelId && (
							<div
								key={id}
								className='text'
							>
								<b>{username}</b>: {body}
							</div>
						)
					)
				})}
			</div>
			<Formik
				initialValues={{ body: '' }}
				onSubmit={handleSendMessage}
			>
				{({ values }) => {
					const isDisabled = !values.body
					return (
						<Form>
							<div className='form-group'>
								<Field
									className='form-control'
									innerRef={inputRef}
									type='text'
									name='body'
									aria-label='Новое сообщение'
									placeholder='Введите сообщение...'
								/>
								<button
									disabled={isDisabled}
									type='submit'
									className='btn btn-primary'
								>
									Отправить
								</button>
							</div>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default Messages
