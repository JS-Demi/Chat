// prettier-ignore
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as filter from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePopUpSchema } from '../../hooks/usePopUpSchema';
import { useAddChannelMutation } from '../../store/services/channelsApi';
import { setActiveChannel } from '../../store/slices/commonSlice';

const PopUpAddChannel = ({ handleClose }) => {
  const dispatch = useDispatch();
  // create ref for focus
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // use hooks for i18n, create channel and schema
  const { t } = useTranslation();
  const [addChannel, { isLoading }] = useAddChannelMutation();
  const schema = usePopUpSchema();

  // create submit handle for add channel
  const handleSubmit = ({ name }) => {
    // filter bad words
    const filtered = filter.clean(name, '*', 0);
    addChannel({ name: filtered })
      .unwrap()
      .then((channel) => {
        dispatch(setActiveChannel(channel));
        toast.success(t('toastify.successCreate'));
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
        <Modal.Title id="contained-modal-title-vcenter">{t('popUp.addChannel')}</Modal.Title>
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
                  {t('popUp.add')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default PopUpAddChannel;
