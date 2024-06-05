import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorDialog.module.css';

const ErrorDialog = ({ messages, onClose }) => (
  <div className={styles.overlay}>
    <div className={styles.dialog}>
      {Array.isArray(messages) ? (
        messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))
      ) : (
        <p>{messages}</p>
      )}
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);

ErrorDialog.propTypes = {
  messages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorDialog;
