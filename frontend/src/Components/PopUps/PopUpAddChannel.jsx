import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as filter from 'leo-profanity'
import React, { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { usePopUpSchema } from '../../hooks/usePopUpSchema'
import { useAddChannelMutation } from '../../store/services/channelsApi'
import './modals.scss'

const PopUpAddChannel = ({ modalInfo, handleClose, setActiveChannel }) => {
	// create ref for focus
	const inputRef = useRef()
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [inputRef])

	// use hooks for i18n, create channel and schema
	const { t } = useTranslation()
	const [addChannel] = useAddChannelMutation()
	const schema = usePopUpSchema()

	// create submit handle for add channel
	const handleSubmit = ({ name }) => {
		// filter bad words
		const filtered = filter.clean(name, '*', 0)
		addChannel({ name: filtered })
			.unwrap()
			.then((res) => {
				setActiveChannel(res)
				toast.success(t('toastify.successCreate'))
				handleClose()
			})
			.catch((error) => {
				if (error.status === 'FETCH_ERROR') {
					toast.error(t('toastify.fetchError'))
				}
				handleClose()
				console.log(error)
			})
	}

	return (
		<Modal show={true} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{t('popUp.addChannel')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						name: '',
					}}
					onSubmit={handleSubmit}
					validationSchema={schema}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({ errors, isSubmitting }) => {
						return (
							<Form>
								<div>
									<label id='name' className='visually-hidden' htmlFor='name'>
										{t('popUp.label')}
									</label>
									<Field className={`form-control ${!errors.name ? '' : 'is-invalid'}`} type='text' name='name' innerRef={inputRef} />
									<ErrorMessage component='div' className='invalid-feedback' name='name' />
								</div>
								<div className='d-flex justify-content-end'>
									<button type='button' className='btn btn-secondary' onClick={handleClose}>
										{t('popUp.cancel')}
									</button>
									<button type='submit' className='btn btn-primary' disabled={isSubmitting}>
										{t('popUp.add')}
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
