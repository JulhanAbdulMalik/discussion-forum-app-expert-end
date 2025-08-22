/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

/**
 * Skenario Test React Component RegisterInput
 *
 * - should display the typed value in the name input
 * - should display the typed value in the email input
 * - should display the typed value in the password input
 * - should call handleRegister function when register button is clicked
 */

// Komponen Wrapper untuk mengelola state dari RegisterInput,
const TestWrapper = ({ handleRegister = () => {} }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <RegisterInput
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleRegister={handleRegister}
    />
  );
};

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display the typed value in the name input', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <TestWrapper />
      </MemoryRouter>
    );
    const nameInput = await screen.getByLabelText('Nama Lengkap');

    // Action
    const testName = 'John Doe';
    await userEvent.type(nameInput, testName);

    // Assert
    expect(nameInput).toHaveValue(testName);
  });

  it('should display the typed value in the email input', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <TestWrapper />
      </MemoryRouter>
    );
    const emailInput = await screen.getByLabelText('Email');

    // Action
    const testEmail = 'johndoe@email.com';
    await userEvent.type(emailInput, testEmail);

    // Assert
    expect(emailInput).toHaveValue(testEmail);
  });

  it('should display the typed value in the password input', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <TestWrapper />
      </MemoryRouter>
    );
    const passwordInput = await screen.getByLabelText('Password');

    // Action
    const testPassword = 'secretpassword';
    await userEvent.type(passwordInput, testPassword);

    // Assert
    expect(passwordInput).toHaveValue(testPassword);
  });

  it('should call handleRegister function when register button is clicked', async () => {
    // Arrange
    const mockHandleRegister = vi.fn((e) => e.preventDefault());
    render(
      <MemoryRouter>
        <TestWrapper handleRegister={mockHandleRegister} />
      </MemoryRouter>
    );

    // Mengisi semua input untuk mensimulasikan alur pengguna yang lengkap
    const nameInput = await screen.getByLabelText('Nama Lengkap');
    await userEvent.type(nameInput, 'John Doe');
    const emailInput = await screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'johndoe@email.com');
    const passwordInput = await screen.getByLabelText('Password');
    await userEvent.type(passwordInput, 'secretpassword');

    const registerButton = await screen.getByRole('button', { name: 'Daftar' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockHandleRegister).toHaveBeenCalledTimes(1);
  });
});
