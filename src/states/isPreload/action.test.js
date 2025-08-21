/**
 * Skenario Test
 *
 * - asyncPreloadProcess thunk
 * - should dispatch action correctly when getOwnProfile success
 * - should dispatch action correctly when getOwnProfile failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';

// --- Mock Data ---
const fakeAuthUserResponse = {
  id: 'user-123',
  name: 'Julhan Abdul Malik',
  email: 'julhan@example.com',
  avatar: 'example.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

// --- Test Suite ---
describe('isPreload thunk', () => {
  // Backup and restore original API function
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  describe('asyncPreloadProcess thunk', () => {
    // Skenario 1: Proses preload berhasil (pengguna terautentikasi)
    it('should dispatch action correctly when getOwnProfile success', async () => {
      // Arrange
      api.getOwnProfile = vi.fn(() => Promise.resolve(fakeAuthUserResponse));
      const dispatch = vi.fn();

      // Action
      await asyncPreloadProcess()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());

      expect(dispatch).toHaveBeenCalledWith(
        setAuthUserActionCreator(fakeAuthUserResponse)
      );
      expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));

      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    // Skenario 2: Proses preload gagal (pengguna tidak terautentikasi)
    it('should dispatch action correctly when getOwnProfile failed', async () => {
      // Arrange
      api.getOwnProfile = vi.fn(() => Promise.reject(fakeErrorResponse));
      const dispatch = vi.fn();

      // Action
      await asyncPreloadProcess()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());

      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
      expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));

      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
