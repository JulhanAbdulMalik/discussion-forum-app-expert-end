/**
 * Skenario Test
 *
 * - asyncPopulateUsers thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncRegisterUser thunk
 * - should call api.register and not throw error on success
 * - should call alert and re-throw error when registration failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import {
  asyncPopulateUsers,
  asyncRegisterUser,
  receiveUsersActionCreator,
} from './action';

// --- Mock Data ---
const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'Julhan Abdul Malik',
    email: 'julhan@test.com',
  },
  {
    id: 'user-2',
    name: 'Abdul Malik',
    email: 'abdul@test.com',
  },
];

const fakeRegisterInput = {
  name: 'Julhan Malik',
  email: 'malik@test.com',
  password: 'password123',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('users thunks', () => {
  // Backup and restore original API functions
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._register = api.register;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.register = api._register;

    delete api._getAllUsers;
    delete api._register;
  });

  // --- Test for asyncPopulateUsers ---
  describe('asyncPopulateUsers thunk', () => {
    // Skenario 1 : Harus mengirimkan tindakan dengan benar ketika pengambilan data berhasil
    it('should dispatch action correctly when data fetching success', async () => {
      // Arrange
      api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
      const dispatch = vi.fn();

      // Action
      await asyncPopulateUsers()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        receiveUsersActionCreator(fakeUsersResponse)
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    // Skenario 2 : Harus mengirimkan tindakan dan memanggil peringatan dengan benar ketika pengambilan data gagal
    it('should dispatch action and call alert correctly when data fetching failed', async () => {
      // Arrange
      api.getAllUsers = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();
      window.alert = vi.fn();

      // Action
      await asyncPopulateUsers()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  // --- Test for asyncRegisterUser ---
  describe('asyncRegisterUser thunk', () => {
    // Skenario 1 : Harus memanggil api.register dan tidak melempar kesalahan jika berhasil
    it('should call api.register and not throw error on success', async () => {
      // Arrange
      api.register = vi.fn(() => Promise.resolve());
      const dispatch = vi.fn();

      // Action
      await expect(
        asyncRegisterUser(fakeRegisterInput)(dispatch)
      ).resolves.toBeUndefined();

      // Assert
      expect(api.register).toHaveBeenCalledWith(fakeRegisterInput);
    });

    // Skenario 2 : Harus memanggil peringatan dan melempar kesalahan ketika registrasi gagal
    it('should call alert and re-throw error when registration failed', async () => {
      // Arrange
      api.register = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();
      window.alert = vi.fn();

      // Action
      await expect(
        asyncRegisterUser(fakeRegisterInput)(dispatch)
      ).rejects.toThrow(fakeErrorResponse);

      // Assert
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });
});
