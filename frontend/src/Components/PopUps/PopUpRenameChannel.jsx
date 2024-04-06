// prettier-ignore
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as filter from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { usePopUpSchema } from '../../hooks/usePopUpSchema';
import { useGetChannelsQuery, useRenameChannelMutation } from '../../store/services/channelsApi';

const PopUpRenameChannel = ({ popUpData, handleClose }) => {
  // creating ref for input and set focus and select on it
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  // use hooks for i18n, rename channel, schema and data for initial state form
  const { data: channels } = useGetChannelsQuery();
  const { t } = useTranslation();
  const [renameChannel, { isLoading }] = useRenameChannelMutation();
  const schema = usePopUpSchema();

  // get id of the channel to change and channel for initial state
  const { id } = popUpData;
  const channel = channels.find((c) => c.id === id);
  // create handle submit for rename channel
  const handleSubmit = ({ name }) => {
    // filter bad words
    const filtered = { name: filter.clean(name, '*', 0) };
    const data = { body: filtered, id };
    renameChannel(data)
      .unwrap()
      .then(() => {
        toast.success(t('toastify.successRename'));
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
        <Modal.Title id="contained-modal-title-vcenter">{t('popUp.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: channel.name,
          }}
          onSubmit={handleSubmit}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ errors }) => (
            <Form>
              <div>
                <Field
                  id="name"
                  className={`form-control ${!errors.name ? '' : 'is-invalid'}`}
                  type="text"
                  name="name"
                  innerRef={inputRef}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t('popUp.label')}
                </label>
                <ErrorMessage component="div" className="invalid-feedback" name="name" />
              </div>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleClose}>
                  {t('popUp.cancel')}
                </Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {t('popUp.rename')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default PopUpRenameChannel;
