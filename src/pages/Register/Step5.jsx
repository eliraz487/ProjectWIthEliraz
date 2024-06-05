import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import styles from './Register.module.css';

const Step5 = ({ formData, handleChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className={styles.passwordContainer}>
        <input
          className={styles.inputField}
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
        </button>
      </div>
      <div className={styles.passwordContainer}>
        <input
          className={styles.inputField}
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
        </button>
      </div>
    </>
  );
};

Step5.propTypes = {
  formData: PropTypes.shape({
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

Step5.validate = (formData) => {
  let valid = true;
  const errorMessages = [];

  const hasCapitalLetter = (password) => /[A-Z]/.test(password);
  const hasNumber = (password) => /\d/.test(password);

  if (!formData.password) {
    valid = false;
    errorMessages.push('Password is required');
  } else {
    if (!hasCapitalLetter(formData.password)) {
      valid = false;
      errorMessages.push('Password must contain at least one capital letter');
    }
    if (!hasNumber(formData.password)) {
      valid = false;
      errorMessages.push('Password must contain at least one number');
    }
  }

  if (formData.password !== formData.confirmPassword) {
    valid = false;
    errorMessages.push('Passwords do not match');
  }

  return { valid, errorMessages };
};

export default Step5;
