import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { getSelector } from '../redux';
import connect from '../connect';

const MessageForm = ({
  submitMessage,
}) => {
  const currentChannelId = useSelector(getSelector('currentChannelId'));
  const messageFormState = useSelector(getSelector('messageFormState'));
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      const { message } = values;
      const data = {
        data: {
          attributes: {
            message,
          },
        },
      };
      submitMessage(currentChannelId, data, resetForm);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="message">Message</label>
      <input
        id="message"
        name="message"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.message}
        disabled={messageFormState === 'fetching'}
      />
    </form>
  );
};

MessageForm.propTypes = {
  submitMessage: PropTypes.func.isRequired,
};

export default connect()(MessageForm);
