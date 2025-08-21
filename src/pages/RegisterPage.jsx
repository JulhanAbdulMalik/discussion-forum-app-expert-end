import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await dispatch(asyncRegisterUser({ name, email, password }));

      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="register-page">
      <div className="register-page__container">
        <header className="register-page__header">
          <h2>Registrasi</h2>
          <p>Bergabunglah dengan komunitas kami!</p>
        </header>

        <main className="register-page__content">
          <RegisterInput
            handleRegister={handleRegister}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            name={name}
            email={email}
            password={password}
          />
        </main>
      </div>
    </section>
  );
};

export default RegisterPage;
