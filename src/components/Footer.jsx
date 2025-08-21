import React from 'react';
import {
  FaChartBar,
  FaRegComments,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Footer = ({ authUser, logout }) => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-links">
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <FaRegComments />
                  <span>Threads</span>
                </Link>
              </li>
              <li>
                <Link to="/leaderboards">
                  <FaChartBar />
                  <span>Leaderboards</span>
                </Link>
              </li>
              <li>
                {authUser ? (
                  <Link className="logout-button" to="/login">
                    <button
                      onClick={logout}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <FaSignOutAlt />
                    </button>
                    <span className="logout-span">Logout</span>
                  </Link>
                ) : (
                  <Link to="/login">
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
