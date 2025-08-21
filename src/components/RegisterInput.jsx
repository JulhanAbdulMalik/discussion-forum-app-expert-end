import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RegisterInput = ({
  handleRegister,
  setName,
  setEmail,
  setPassword,
  name,
  email,
  password,
}) => {
  return (
    <>
      <form onSubmit={handleRegister} className="register-page__form">
        <div className="form-group">
          <label htmlFor="name">Nama Lengkap</label>
          <input
            id="name"
            type="text"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register-page__button">
          Daftar
        </button>
      </form>
      <p className="register-page__login-link">
        Sudah punya akun? <Link to="/login">Masuk di sini</Link>
      </p>
    </>
  );
};

RegisterInput.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default RegisterInput;
