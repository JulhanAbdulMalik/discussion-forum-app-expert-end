import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import LeaderboardList from './LeaderboardList';

expect.extend(matchers);

/**
 * Skenario Test React Component LeaderboardList
 *
 * - should render headers correctly
 * - should render the list of users and their scores correctly
 * - should not render any user items if the leaderboard is empty
 */

describe('LeaderboardList component', () => {
  // Mock data untuk disimulasikan sebagai prop 'leaderboard'
  const mockLeaderboard = [
    {
      user: {
        id: 'user-1',
        name: 'Julhan Abdul Malik',
        email: 'julhan@example.com',
        avatar: 'example/julhan',
      },
      score: 100,
    },
    {
      user: {
        id: 'user-2',
        name: 'Abdul',
        email: 'abdul@example.com',
        avatar: 'example/abdul',
      },
      score: 95,
    },
  ];

  afterEach(() => {
    cleanup();
  });

  it('should render headers correctly', () => {
    // Arrange
    render(<LeaderboardList leaderboard={mockLeaderboard} />);

    // Assert
    expect(screen.getByText('Pengguna')).toBeInTheDocument();
    expect(screen.getByText('Skor')).toBeInTheDocument();
  });

  it('should render the list of users and their scores correctly', () => {
    // Arrange
    render(<LeaderboardList leaderboard={mockLeaderboard} />);

    // Assert - Verifikasi data pengguna pertama
    const userOneName = screen.getByText('Julhan Abdul Malik');
    const userOneScore = screen.getByText('100');
    const userOneAvatar = screen.getByAltText('Avatar of Julhan Abdul Malik');
    expect(userOneName).toBeInTheDocument();
    expect(userOneScore).toBeInTheDocument();
    expect(userOneAvatar).toBeInTheDocument();
    expect(userOneAvatar).toHaveAttribute(
      'src',
      mockLeaderboard[0].user.avatar
    );

    // Assert - Verifikasi data pengguna kedua
    const userTwoName = screen.getByText('Abdul');
    const userTwoScore = screen.getByText('95');
    const userTwoAvatar = screen.getByAltText('Avatar of Abdul');
    expect(userTwoName).toBeInTheDocument();
    expect(userTwoScore).toBeInTheDocument();
    expect(userTwoAvatar).toBeInTheDocument();
    expect(userTwoAvatar).toHaveAttribute(
      'src',
      mockLeaderboard[1].user.avatar
    );
  });

  it('should not render any user items if the leaderboard is empty', () => {
    // Arrange
    render(<LeaderboardList leaderboard={[]} />);

    // Assert
    const userOneName = screen.queryByText('Julhan Abdul Malik');
    const userTwoName = screen.queryByText('Abdul');

    expect(userOneName).toBeNull();
    expect(userTwoName).toBeNull();
  });
});
