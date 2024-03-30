import React from 'react'
import { Modal } from 'react-bootstrap'
import { useRemoveChannelMutation } from '../../services/channelsApi'
import './modals.scss'

const PopUpRemoveChannel = ({ modalInfo, handleClose, setActiveChannel }) => {
	// get hook for delete channel
	const [removeChannel] = useRemoveChannelMutation()

	// get the id of the channel to be deleted
	const { id } = modalInfo

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
				<Modal.Title id='contained-modal-title-vcenter'>Удалить канал</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<span className='italic'>Уверены?</span>
			</Modal.Body>
			<div className='d-flex justify-content-end'>
				<button type='button' className='btn btn-secondary' onClick={handleClose}>
					Отменить
				</button>
				<button onClick={handleSubmit} type='button' className='btn btn-danger'>
					Удалить
				</button>
			</div>
		</Modal>
	)
}

export default PopUpRemoveChannel
