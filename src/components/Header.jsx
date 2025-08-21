import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.svg';
import PropTypes from 'prop-types';

const Header = ({ authUser }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">Forum Diskusi - byJulhan</Link>
        </div>

        <div className="header-actions">
          {authUser ? (
            <img
              className="user-avatar"
              src={authUser.avatar}
              alt="User Avatar"
            />
          ) : (
            <img className="user-avatar" src={avatar} alt="User Avatar" />
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authUser: PropTypes.object,
};

export default Header;
