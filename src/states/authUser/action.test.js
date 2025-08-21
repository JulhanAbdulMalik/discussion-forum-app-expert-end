/**
 * Skenario Test
 *
 * - asyncSetAuthUser thunk
 * - should dispatch action correctly when login success
 * - should dispatch action and call alert correctly when login failed
 *
 * - asyncUnsetAuthUser thunk
 * - should dispatch action correctly and call api.putAccessToken to logout
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

// --- Mock Data ---
const fakeToken = 'dummy-token';
const fakeAuthUserResponse = {
  id: 'user-123',
  name: 'Julhan Abdul Malik',
  email: 'julhan@example.com',
  avatar: 'example.jpg',
};

const fakeLoginInput = {
  email: 'julhan@example.com',
  password: 'password123',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

// --- Test Suite ---
describe('authUser thunks', () => {
  // Backup and restore original API functions
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });

  // --- Test for asyncSetAuthUser ---
  describe('asyncSetAuthUser thunk', () => {
    it('should dispatch action correctly when login success', async () => {
      // Arrange
      api.login = vi.fn(() => Promise.resolve(fakeToken));
      api.getOwnProfile = vi.fn(() => Promise.resolve(fakeAuthUserResponse));
      api.putAccessToken = vi.fn();
      const dispatch = vi.fn();

      // Action
      await asyncSetAuthUser(fakeLoginInput)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalledWith(fakeLoginInput);
      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        setAuthUserActionCreator(fakeAuthUserResponse)
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when login failed', async () => {
      // Arrange
      api.login = vi.fn(() => Promise.reject(fakeErrorResponse));
      const dispatch = vi.fn();
      window.alert = vi.fn();

      // Action
      await asyncSetAuthUser(fakeLoginInput)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  // --- Test for asyncUnsetAuthUser ---
  describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch action correctly and call api.putAccessToken to logout', () => {
      // Arrange
      api.putAccessToken = vi.fn();
      const dispatch = vi.fn();

      // Action
      asyncUnsetAuthUser()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(api.putAccessToken).toHaveBeenCalledWith('');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
