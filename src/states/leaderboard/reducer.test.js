/**
 * Test scenario for leaderboardReducer
 *
 * - leaderboardReducer function
 * - should return the initial state when given by unknown action
 * - should return the leaderboard when given by RECEIVE_LEADERBOARD action
 *
 */

import { describe, it, expect } from 'vitest';
import { leaderboardReducer } from './reducer';

describe('leaderboardReducer function', () => {
  // Skenario 1: Aksi tidak dikenal
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  // Skenario 2: Aksi RECEIVE_LEADERBOARD
  it('should return the leaderboard when given by RECEIVE_LEADERBOARD action', () => {
    // Arrange
    const initialState = [];
    const leaderboardData = [
      {
        user: {
          id: 'users-1',
          name: 'Julhan Abdul Malik',
          email: 'Julhan@example.com',
          avatar: 'example.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Julhan Abdul Malik',
          email: 'Julhan@example.com',
          avatar: 'example.jpg',
        },
        score: 5,
      },
    ];
    const action = {
      type: 'RECEIVE_LEADERBOARD',
      payload: {
        leaderboard: leaderboardData,
      },
    };

    // Act
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(leaderboardData);
  });
});
