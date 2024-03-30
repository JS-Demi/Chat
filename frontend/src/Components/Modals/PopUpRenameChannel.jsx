import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'
import { useGetChannelsQuery, useRenameChannelMutation } from '../../services/channelsApi'
import './modals.scss'

const PopUpRenameChannel = ({ modalInfo, handleClose }) => {
	// creating ref for input and set focus and select on it
	const inputRef = useRef()
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [inputRef])

	// get our channels names list for our schema
	const { data: channels } = useGetChannelsQuery()
	const channelsNames = channels.map(({ name }) => name)

	// get id of the channel to change
	const { id } = modalInfo
	const channel = channels.find((c) => c.id === id)
	// get renameChannel hook
	const [renameChannel] = useRenameChannelMutation()

	// submit our formik
	const handleSubmit = (name) => {
		const data = { name, id }
		renameChannel(data)
			.unwrap()
			.then((res) => {
				handleClose()
			})
			.catch((error) => console.log(error))
	}

	const channelsSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, 'Не менее 3 символов')
			.max(20, 'Не более 20 символов')
			.matches(/^\S+$/, 'Имя канала не может содержать пробелы')
			.notOneOf(channelsNames, 'Канал с таким именем уже существует'),
	})

	return (
		<Modal show={true} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Переименовать канал</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						name: channel.name,
					}}
					onSubmit={handleSubmit}
					validationSchema={channelsSchema}
				>
					{({ errors, isSubmitting }) => {
						return (
							<Form>
								<div>
									<label id='name' className='visually-hidden' htmlFor='name'>
										Название канала
									</label>
									<Field className={`form-control ${!errors.name ? '' : 'is-invalid'}`} type='text' name='name' innerRef={inputRef} />
									<ErrorMessage component='div' className='invalid-feedback' name='name' />
								</div>
								<div className='d-flex justify-content-end'>
									<button type='button' className='btn btn-secondary' onClick={handleClose}>
										Отменить
									</button>
									<button type='submit' className='btn btn-primary' disabled={isSubmitting}>
										Отправить
									</button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</Modal.Body>
		</Modal>
	)
}

export default PopUpRenameChannel
