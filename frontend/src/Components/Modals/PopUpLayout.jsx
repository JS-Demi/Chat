// import { Form } from 'formik'
import React from 'react'
import callModal from './modals'

const renderModal = (modalInfo, handleClose, setActiveChannel) => {}

const PopUpLayout = ({ modalInfo, handleClose, setActiveChannel }) => {
	if (!modalInfo.type) {
		return null
	}
	const ModalComponent = callModal(modalInfo.type)

	return <ModalComponent modalInfo={modalInfo} handleClose={handleClose} setActiveChannel={setActiveChannel} />
}

export default PopUpLayout
