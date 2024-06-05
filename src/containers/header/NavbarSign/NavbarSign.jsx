import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavbarSign.module.css';
import { getTranslations } from '../../../translation';

const NavbarSign = ({ currentUser, handleLogin, handleRegister, handleLogout }) => {
  const t = getTranslations();

  return (
    <div className={styles.navbarSign}>
      {currentUser ? (
        <button onClick={handleLogout} type="button" className={styles.logoutButton}>{t.logout}</button>
      ) : (
        <>
          <button onClick={handleLogin} type="button" className={styles.loginButton}>{t.login}</button>
          <button onClick={handleRegister} type="button" className={styles.registerButton}>{t.register}</button>
        </>
      )}
    </div>
  );
};

NavbarSign.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  currentUser: PropTypes.object,
  handleLogin: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default NavbarSign;
