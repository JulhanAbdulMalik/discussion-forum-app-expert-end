/**
 * Test scenario for authUserReducer
 *
 * - authUserReducer function
 * - should return the initial state when given by unknown action
 * - should return the authUser when given by SET_AUTH_USER action
 * - should return null when given by UNSET_AUTH_USER action
 *
 */

import { describe, it, expect } from 'vitest';
import { authUserReducer } from './reducer';

describe('authUserReducer function', () => {
  // Skenario 1: Aksi tidak dikenal
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  // Skenario 2: Aksi SET_AUTH_USER
  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // Arrange
    const initialState = null;
    const authUser = {
      id: 'user-1',
      name: 'Julhan Abdul Malik',
      email: 'Julhan@example.com',
    };
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser,
      },
    };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(authUser);
  });

  // Skenario 3: Aksi UNSET_AUTH_USER
  it('should return null when given by UNSET_AUTH_USER action', () => {
    // Arrange
    const initialState = {
      id: 'user-1',
      name: 'Julhan Abdul Malik',
      email: 'Julhan@example.com',
    };
    const action = {
      type: 'UNSET_AUTH_USER',
    };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });
});
