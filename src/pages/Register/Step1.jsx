import React from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';

const Step1 = ({ formData, handleChange }) => (
  <>
    <input
      className={styles.inputField}
      type="text"
      placeholder="First Name"
      value={formData.firstName}
      onChange={(e) => handleChange('firstName', e.target.value)}
    />
    <input
      className={styles.inputField}
      type="text"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={(e) => handleChange('lastName', e.target.value)}
    />
    <input
      className={styles.inputField}
      type="email"
      placeholder="Email"
      value={formData.email}
      onChange={(e) => handleChange('email', e.target.value)}
    />
    <input
      className={styles.inputField}
      type="tel"
      placeholder="Phone"
      value={formData.phone}
      onChange={(e) => handleChange('phone', e.target.value)}
    />
  </>
);

Step1.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

Step1.validate = (formData) => {
  let valid = true;
  const errorMessages = [];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+972|0)?[5][0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  if (!formData.firstName) {
    valid = false;
    errorMessages.push('First name is required');
  }
  if (!formData.lastName) {
    valid = false;
    errorMessages.push('Last name is required');
  }
  if (!formData.email) {
    valid = false;
    errorMessages.push('Email is required');
  }
  if (!validateEmail(formData.email)) {
    valid = false;
    errorMessages.push('Email format is invalid');
  }
  if (!formData.phone) {
    valid = false;
    errorMessages.push('Phone number is required');
  }
  if (!validatePhone(formData.phone)) {
    valid = false;
    errorMessages.push('Phone number format is invalid');
  }

  return { valid, errorMessages };
};

export default Step1;
