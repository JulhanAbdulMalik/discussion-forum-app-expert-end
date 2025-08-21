import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoginInput = ({
  handleLogin,
  setEmail,
  setPassword,
  email,
  password,
}) => {
  return (
    <>
      <form onSubmit={handleLogin} className="login-page__form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="contoh@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Masukkan password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-page__button">
          Masuk
        </button>
      </form>
      <p className="login-page__register-link">
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </>
  );
};

LoginInput.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginInput;
