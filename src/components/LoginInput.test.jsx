/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

/**
 * Skenario Test React Component LoginInput
 *
 * - should display the typed value in the email input
 * - should display the typed value in the password input
 * - should call handleLogin function when login button is clicked
 */

// Komponen Wrapper untuk mengelola state dari LoginInput,
const TestWrapper = ({ handleLogin = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginInput
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
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
    const testEmail = 'test@email.com';
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
    const testPassword = 'password123';
    await userEvent.type(passwordInput, testPassword);

    // Assert
    expect(passwordInput).toHaveValue(testPassword);
  });

  it('should call handleLogin function when login button is clicked', async () => {
    // Arrange
    const mockHandleLogin = vi.fn((e) => e.preventDefault());
    render(
      <MemoryRouter>
        <TestWrapper handleLogin={mockHandleLogin} />
      </MemoryRouter>
    );

    const emailInput = await screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'test@email.com');
    const passwordInput = await screen.getByLabelText('Password');
    await userEvent.type(passwordInput, 'password123');

    const loginButton = await screen.getByRole('button', { name: 'Masuk' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
  });
});
