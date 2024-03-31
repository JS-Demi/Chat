// import { Form } from 'formik'
import React from 'react'
import callModal from './modals'

const PopUpLayout = ({ modalInfo, handleClose, setActiveChannel }) => {
	// check if modal is not be called, not rendering it
	if (!modalInfo.type) {
		return null
	}
	// call modal
	const ModalComponent = callModal(modalInfo.type)

	return <ModalComponent modalInfo={modalInfo} handleClose={handleClose} setActiveChannel={setActiveChannel} />
}

export default PopUpLayout
