import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { actions, getSelector } from '../../redux';
import Modal from '../Modal';

const ChannelAddModal = ({
  id,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels } = useSelector(getSelector('channels'));
  const channelsNames = channels.map(({ name }) => name);

  const validationSchema = Yup.object({
    name: Yup.string().notOneOf(channelsNames).required('Required'),
  });

  const handleSubmit = async ({ name }, { resetForm, setStatus, setSubmitting }) => {
    const data = {
      data: {
        attributes: {
          name,
        },
      },
    };

    try {
      await dispatch(actions.renameChannel({ channelId: id, data }));
      resetForm();
      dispatch(actions.hideModal());
    } catch (e) {
      setStatus(t('network'));
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const inputElement = React.useRef(null);
  React.useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);
  return (
    <Modal title={t('edit_channel_title')}>
      <h6 className="text-danger">
        {formik.status}
        &nbsp;
      </h6>
      <form
        onSubmit={formik.handleSubmit}
        className="w-100 p-3 position-relative"
      >
        <label htmlFor="name">{t('edit_channel_title')}</label>
        <input
          id="name"
          name="name"
          type="text"
          className="ml-2"
          ref={inputElement}
          onChange={formik.handleChange}
          value={formik.values.name}
          disabled={formik.isSubmitting}
        />
      </form>
    </Modal>
  );
};

ChannelAddModal.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ChannelAddModal;
