/* eslint-disable comma-dangle */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../store/services/channelsApi';
import './modals.scss';
// prettier-ignore
const PopUpRemoveChannel = ({
  modalInfo, handleClose, setActiveChannel, activeChannelId
}) => {
  // use hooks for i18n and remove channel
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();

  // get the id of the channel to be deleted
  const { id } = modalInfo;
  // create handle submit for remove channel
  const handleSubmit = () => {
    removeChannel(id)
      .unwrap()
      .then(() => {
        if (activeChannelId === id) {
          setActiveChannel({ name: 'general', id: '1' });
        }
        toast.success(t('toastify.successRemove'));
        handleClose();
      })
      .catch((error) => {
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('toastify.fetchError'));
        }
        handleClose();
        console.log(error);
      });
  };

  return (
    <Modal
      show
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('popUp.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('popUp.confirm')}</p>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            {t('popUp.cancel')}
          </button>
          <button onClick={handleSubmit} type="button" className="btn btn-danger">
            {t('popUp.remove')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopUpRemoveChannel;
