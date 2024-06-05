import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './Login.module.css';
import { auth } from '../../firebase/firebaseConfig';
import ErrorDialog from '../../containers/ErrorDialog/ErrorDialog';
import { getTranslations } from '../../translation'; // ייבוא פונקציית התרגום

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const navigate = useNavigate();
  const t = getTranslations(); // הגדרת המשתנה t עם פונקציית התרגום

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/home');
    })
      .catch((error) => {
        setErrors(`${[error]} `);
        setShowErrorDialog(true);
      });
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1>{t.loginPageTitle}</h1>
        <input
          className={styles.inputField}
          type="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.passwordContainer}>
          <input
            className={styles.inputField}
            type={passwordVisible ? 'text' : 'password'}
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        </div>
        <div className={styles.line}>
          <span onClick={handleForgotPassword} className={styles.forgotPasswordText}>
            {t.forgotPasswordText}
          </span>
        </div>
        <button className={styles.loginButton} type="button" onClick={handleLogin}>
          {t.login}
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

export default Login;
