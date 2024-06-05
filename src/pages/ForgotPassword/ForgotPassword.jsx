import React, { useState } from 'react';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import styles from './ForgotPassword.module.css';
import ErrorDialog from '../../containers/ErrorDialog/ErrorDialog';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleForgotPassword = async () => {
    // eslint-disable-next-line no-use-before-define
    if (!validateEmail(email)) {
      setErrors('Invalid email format');
      setShowErrorDialog(true);
      return;
    }
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (!signInMethods.length > 0) {
      setErrors('No user found with this email');
      setShowErrorDialog(true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setErrors('Password reset email sent');
      setShowErrorDialog(true);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setErrors('Failed to send password reset email');
      setShowErrorDialog(true);
    }
  };

  // eslint-disable-next-line no-shadow
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div className={styles.forgotPassword}>
      <div className={styles.forgotPasswordContainer}>
        <h1>Forgot Password</h1>
        <input
          className={styles.inputField}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // eslint-disable-next-line no-undef
            setErrors(null);
          }}
        />
        <div className={styles.line} />
        <button className={styles.resetButton} type="button" onClick={handleForgotPassword}>
          Send Password Reset Email
        </button>
        {showErrorDialog && (
        <ErrorDialog
          messages={errors}
          onClose={() => setShowErrorDialog(false)}
        />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
