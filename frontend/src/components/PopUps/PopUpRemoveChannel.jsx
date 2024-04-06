import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../store/services/channelsApi';
import { selectActiveChannel, setActiveChannel } from '../../store/slices/commonSlice';
// prettier-ignore
const PopUpRemoveChannel = ({
  popUpData, handleClose,
}) => {
  const dispatch = useDispatch();
  // use hooks for i18n and remove channel
  const { t } = useTranslation();
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();
  // get the id of the channel to be deleted and activeChannel id
  const { id } = popUpData;
  const { id: activeChannelId } = useSelector(selectActiveChannel);

  const defaultChannel = { name: 'general', id: '1' };
  // create handle submit for remove channel
  const handleSubmit = () => {
    removeChannel(id)
      .unwrap()
      .then(() => {
        if (activeChannelId === id) {
          dispatch(setActiveChannel(defaultChannel));
        }
        toast.success(t('toastify.successRemove'));
        handleClose();
      })
      .catch((error) => {
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('toastify.fetchError'));
        }
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
          <Button variant="secondary" onClick={handleClose}>
            {t('popUp.cancel')}
          </Button>
          <Button disabled={isLoading} onClick={handleSubmit} variant="danger">
            {t('popUp.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopUpRemoveChannel;
