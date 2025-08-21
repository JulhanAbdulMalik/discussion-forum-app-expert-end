/**
 * Test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 * - should return the initial state when given by unknown action
 * - should return the isPreload when given by SET_IS_PRELOAD action
 *
 */

import { describe, it, expect } from 'vitest';
import { isPreloadReducer } from './reducer';

describe('isPreloadReducer function', () => {
  // Skenario 1: Aksi tidak dikenal
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = true;
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toBe(true);
  });

  // Skenario 2: Aksi SET_IS_PRELOAD
  it('should return the isPreload when given by SET_IS_PRELOAD action', () => {
    // Arrange
    const initialState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: false,
      },
    };

    // Act
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toBe(false);
  });
});
