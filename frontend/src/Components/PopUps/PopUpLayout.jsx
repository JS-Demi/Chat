// import { Form } from 'formik'
import React from 'react';
import callModal from './callModal';

const PopUpLayout = ({ modalInfo, handleClose, setActiveChannel, activeChannelId }) => {
  // check if modal is not be called, not rendering it
  if (!modalInfo.type) {
    return null;
  }
  // call modal
  const ModalComponent = callModal(modalInfo.type);

  return (
    <ModalComponent
      modalInfo={modalInfo}
      handleClose={handleClose}
      setActiveChannel={setActiveChannel}
      activeChannelId={activeChannelId}
    />
  );
};

export default PopUpLayout;
