/**
 * Skenario Test
 *
 * - asyncPopulateLeaderboard thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import {
  asyncPopulateLeaderboard,
  receiveLeaderboardActionCreator,
} from './action';

// --- Mock Data ---
const fakeLeaderboardResponse = [
  {
    user: {
      id: 'user-a',
      name: 'Julhan Abdul Malik',
      email: 'julhan@example.com',
      avatar: 'example.jpg',
    },
    score: 100,
  },
  {
    user: {
      id: 'user-b',
      name: 'Abdul Malik',
      email: 'abdul@example.com',
      avatar: 'example.jpg',
    },
    score: 90,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

// --- Test Suite ---
describe('leaderboard thunk', () => {
  // Backup and restore original API function
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
  });

  describe('asyncPopulateLeaderboard thunk', () => {
    // Skenario 1: Pengambilan data leaderboard berhasil
    it('should dispatch action correctly when data fetching success', async () => {
      // Arrange
      // Stub API untuk mengembalikan data
      api.getLeaderboards = vi.fn(() =>
        Promise.resolve(fakeLeaderboardResponse)
      );
      const dispatch = vi.fn();

      // Action
      await asyncPopulateLeaderboard()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());

      expect(dispatch).toHaveBeenCalledWith(
        receiveLeaderboardActionCreator(fakeLeaderboardResponse)
      );

      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    // Skenario 2: Pengambilan data leaderboard gagal
    it('should dispatch action and call alert correctly when data fetching failed', async () => {
      // Arrange
      // Stub API untuk mengembalikan error
      api.getLeaderboards = vi.fn(() => Promise.reject(fakeErrorResponse));
      const dispatch = vi.fn();
      window.alert = vi.fn();

      // Action
      await asyncPopulateLeaderboard()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());

      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });
});
