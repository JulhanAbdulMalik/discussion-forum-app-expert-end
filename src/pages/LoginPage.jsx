import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="login-page">
      <div className="login-page__container">
        <header className="login-page__header">
          <h2>Login</h2>
          <p>Masuk untuk melanjutkan diskusi!</p>
        </header>

        <main className="login-page__content">
          <LoginInput
            handleLogin={handleLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
          />
        </main>
      </div>
    </section>
  );
};

export default LoginPage;
