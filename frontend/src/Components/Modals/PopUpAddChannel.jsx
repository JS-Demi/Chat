import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'
import { useAddChannelMutation, useGetChannelsQuery } from '../../services/channelsApi'
import './modals.scss'

const PopUpAddChannel = ({ modalInfo, handleClose, setActiveChannel }) => {
	// get our channels names list for our schema
	const { data: channels } = useGetChannelsQuery()
	const channelsNames = channels.map(({ name }) => name)
	// get addChannel hook
	const [addChannel] = useAddChannelMutation()
	const inputRef = useRef()
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [inputRef])

	const handleSubmit = (name) => {
		addChannel(name)
			.unwrap()
			.then((res) => {
				setActiveChannel(res)
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
				<Modal.Title id='contained-modal-title-vcenter'>Добавить канал</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						name: '',
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

export default PopUpAddChannel
