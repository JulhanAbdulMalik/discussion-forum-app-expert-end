/**
 * Test scenario for usersReducer
 *
 * - usersReducer function
 * - should return the initial state when given by unknown action
 * - should return the users when given by RECEIVE_USERS action
 *
 */

import { describe, it, expect } from 'vitest';
import { usersReducer } from './reducer';

describe('usersReducer function', () => {
  // Skenario 1: Mengembalikan initial state jika action tidak dikenali
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  // Skenario 2: Mengembalikan data users saat action adalah RECEIVE_USERS
  it('should return the users when given by RECEIVE_USERS action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_USERS',
      payload: {
        users: [
          {
            id: 'user-1',
            name: 'Julhan Abdul Malik',
            email: 'Julhan@example.com',
            avatar: 'example.jpg',
          },
          {
            id: 'user-2',
            name: 'Malik',
            email: 'Malik@example.com',
            avatar: 'example.jpg',
          },
        ],
      },
    };

    // Act
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.users);
  });
});
