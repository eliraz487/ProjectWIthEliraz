import React from 'react';
import PropTypes from 'prop-types';
import { guestLinks, userLinks } from '../links';
import styles from './NavbarLinks.module.css';

const NavbarLinks = ({ currentUser }) => {
  const renderLinks = (links) => links.map((link, index) => (
    <p key={index}><a href={link.href}>{link.text}</a></p>
  ));

  return (
    <div className={styles.navbarLinksContainer}>
      {renderLinks(currentUser ? userLinks : guestLinks)}
    </div>
  );
};

NavbarLinks.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  currentUser: PropTypes.object,
};

export default NavbarLinks;
