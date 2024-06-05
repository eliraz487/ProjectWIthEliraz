import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

import { useAuth } from '../../firebase/AuthContext';
import NavbarLinks from './NavbarLinks/NavbarLinks';
import NavbarSign from './NavbarSign/NavbarSign';
import NavbarMenu from './NavbarMenu/NavbarMenu';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLinks}>
        <div className={styles.navbarLinksLogo} />
        <NavbarLinks currentUser={currentUser} />
      </div>\
      <NavbarSign
        currentUser={currentUser}
        handleLogin={() => navigate('/login')}
        handleRegister={() => navigate('/register')}
        handleLogout={handleLogout}
      />
      <NavbarMenu
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        currentUser={currentUser}
        handleLogin={() => navigate('/login')}
        handleRegister={() => navigate('/register')}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Header;
