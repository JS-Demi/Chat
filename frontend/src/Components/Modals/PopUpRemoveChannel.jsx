import React from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useRemoveChannelMutation } from '../../store/services/channelsApi'
import './modals.scss'

const PopUpRemoveChannel = ({ modalInfo, handleClose, setActiveChannel }) => {
	// use hooks for i18n and remove channel
	const { t } = useTranslation()
	const [removeChannel] = useRemoveChannelMutation()

	// get the id of the channel to be deleted
	const { id } = modalInfo

	// create handle submit for remove channel
	const handleSubmit = () => {
		removeChannel(id)
			.unwrap()
			.then((res) => {
				setActiveChannel({ name: 'General', id: 1 })
				handleClose()
			})
			.catch((error) => {
				handleClose()
				console.log(error)
			})
	}

	return (
		<Modal show={true} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{t('popUp.removeChannel')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<span className='italic'>{t('popUp.confirm')}</span>
			</Modal.Body>
			<div className='d-flex justify-content-end'>
				<button type='button' className='btn btn-secondary' onClick={handleClose}>
					{t('popUp.cancel')}
				</button>
				<button onClick={handleSubmit} type='button' className='btn btn-danger'>
					{t('popUp.remove')}
				</button>
			</div>
		</Modal>
	)
}

export default PopUpRemoveChannel
