import React from 'react';
import PropTypes from 'prop-types';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import NavbarLinks from '../NavbarLinks/NavbarLinks';
import styles from './NavbarMenu.module.css';
import { getTranslations } from '../../../translation'; // ייבוא פונקציית התרגום

const NavbarMenu = ({ toggleMenu, setToggleMenu, currentUser, handleLogin, handleRegister, handleLogout }) => {
  const t = getTranslations(); // הגדרת המשתנה t עם פונקציית התרגום

  return (
    <div className={styles.navbarMenu}>
      {toggleMenu
        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
      {toggleMenu && (
        <div className={`${styles.navbarMenuContainer} ${styles.scaleUpCenter}`}>
          <NavbarLinks currentUser={currentUser} />
          <div className={styles.navbarMenuContainerLinksSign}>
            {currentUser ? (
              <button onClick={handleLogout} type="button" className={styles.logoutButton}>{t.logout}</button>
            ) : (
              <>
                <button onClick={handleLogin} type="button" className={styles.loginButton}>{t.login}</button>
                <button onClick={handleRegister} type="button" className={styles.registerButton}>{t.register}</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

NavbarMenu.propTypes = {
  toggleMenu: PropTypes.bool.isRequired,
  setToggleMenu: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  currentUser: PropTypes.object,
  handleLogin: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default NavbarMenu;
