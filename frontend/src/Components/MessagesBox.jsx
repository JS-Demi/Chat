import { Field, Form, Formik } from 'formik'
import * as filter from 'leo-profanity'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetMessagesQuery, useSendMessageMutation } from '../store/services/messagesApi'

const Messages = ({ activeChannel }) => {
	// create ref for input and focused input
	const inputRef = useRef(null)
	useEffect(() => {
		if (inputRef) {
			inputRef.current.focus()
		}
	}, [inputRef])

	// use hooks for messages data, send message and i18n
	const { data: messages } = useGetMessagesQuery()
	const { t } = useTranslation()
	const [sendMessage] = useSendMessageMutation()

	// get username
	const user = localStorage.getItem('user')
	// get id of active channel
	const { id: activeChannelId } = activeChannel
	// get count of messages in channel

	// create handle submit for send message
	const handleSendMessage = ({ body }, { resetForm }) => {
		// filter bad words
		const filtered = filter.clean(body, '*', 0)
		// create message for our api
		const message = { body: filtered, channelId: activeChannelId, username: user }
		sendMessage(message)
			.unwrap()
			.then(() => {
				resetForm()
			})
			.catch((error) => console.log(error))
	}

	return (
		<>
			<div id='messages-box' className='chat__messages__box overflow-auto px-5 '>
				{messages?.map(
					({ username, body, channelId, id }) =>
						activeChannelId === channelId && (
							<div key={id} className='text-break mb-2'>
								<b>{username}</b>: {body}
							</div>
						)
				)}
			</div>
			<div className='chat__messages__form mt-auto px-5 py-3'>
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
										aria-label={t('chat.messages.label')}
										placeholder={t('chat.messages.placeholder')}
									/>
									<button disabled={isDisabled} type='submit' className='btn btn-group-vertical'>
										<svg className='enter-icon' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
											<path d='M20 5H8V9H6V3H22V21H6V15H8V19H20V5Z' fill='currentColor' />
											<path
												d='M13.0743 16.9498L11.6601 15.5356L14.1957 13H2V11H14.1956L11.6601 8.46451L13.0743 7.05029L18.024 12L13.0743 16.9498Z'
												fill='currentColor'
											/>
										</svg>
										<span className='visually-hidden'>{t('chat.messages.sendMessage')}</span>
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
