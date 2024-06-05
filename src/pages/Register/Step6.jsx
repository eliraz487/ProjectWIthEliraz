import React from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';
import { validateUserCode } from '../../api';

const Step6 = ({ formData, handleChange }) => (
  <>
    <input
      className={styles.inputField}
      type="text"
      placeholder="Enter 6-digit code"
      value={formData.code}
      onChange={(e) => handleChange('code', e.target.value)}
    />
  </>
);

Step6.propTypes = {
  formData: PropTypes.shape({
    code: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

Step6.validate = async (formData) => {
  let valid = true;
  const errorMessages = [];

  if (!formData.code) {
    valid = false;
    errorMessages.push('Code is required');
  }

  if (valid) {
    try {
      const response = await validateUserCode(formData.email, formData.code);
      if (!response.valid) {
        valid = false;
        errorMessages.push('Invalid code');
      }
    } catch (error) {
      valid = false;
      errorMessages.push('Failed to validate code');
    }
  }

  return { valid, errorMessages };
};

export default Step6;
