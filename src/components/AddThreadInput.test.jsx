/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import AddThreadInput from './AddThreadInput';

expect.extend(matchers);

/**
 * Skenario Test React Component AddThreadInput
 *
 * - should display the typed value in the title input
 * - should display the typed value in the category input
 * - should display the typed value in the body textarea
 * - should call handleAddThread function when the form is submitted
 */

// Komponen Wrapper untuk mengelola state dari AddThreadInput,
const TestWrapper = ({ handleAddThread = () => {} }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  return (
    <AddThreadInput
      title={title}
      setTitle={setTitle}
      category={category}
      setCategory={setCategory}
      body={body}
      setBody={setBody}
      handleAddThread={handleAddThread}
    />
  );
};

describe('AddThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display the typed value in the title input', async () => {
    // Arrange
    render(<TestWrapper />);
    const titleInput = await screen.getByLabelText('Judul');

    // Action
    const testTitle = 'Ini adalah judul thread';
    await userEvent.type(titleInput, testTitle);

    // Assert
    expect(titleInput).toHaveValue(testTitle);
  });

  it('should display the typed value in the category input', async () => {
    // Arrange
    render(<TestWrapper />);
    const categoryInput = await screen.getByLabelText('Kategori (Opsional)');

    // Action
    const testCategory = 'react';
    await userEvent.type(categoryInput, testCategory);

    // Assert
    expect(categoryInput).toHaveValue(testCategory);
  });

  it('should display the typed value in the body textarea', async () => {
    // Arrange
    render(<TestWrapper />);
    const bodyTextarea = await screen.getByLabelText('Diskusi');

    // Action
    const testBody = 'Ini adalah isi dari diskusi thread.';
    await userEvent.type(bodyTextarea, testBody);

    // Assert
    expect(bodyTextarea).toHaveValue(testBody);
  });

  it('should call handleAddThread function when the form is submitted', async () => {
    // Arrange
    const mockHandleAddThread = vi.fn((e) => e.preventDefault());
    render(<TestWrapper handleAddThread={mockHandleAddThread} />);

    // Mengisi semua input untuk mensimulasikan alur pengguna yang lengkap
    const titleInput = await screen.getByLabelText('Judul');
    await userEvent.type(titleInput, 'Judul untuk submit');
    const categoryInput = await screen.getByLabelText('Kategori (Opsional)');
    await userEvent.type(categoryInput, 'testing');
    const bodyTextarea = await screen.getByLabelText('Diskusi');
    await userEvent.type(bodyTextarea, 'Isi diskusi untuk submit.');

    const submitButton = await screen.getByRole('button', {
      name: 'Kirim Thread',
    });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockHandleAddThread).toHaveBeenCalledTimes(1);
  });
});
