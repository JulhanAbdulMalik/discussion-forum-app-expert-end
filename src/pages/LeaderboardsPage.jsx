import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateLeaderboard } from '../states/leaderboard/action';
import LeaderboardList from '../components/LeaderboardList';

const LeaderboardsPage = () => {
  const leaderboard = useSelector((states) => states.leaderboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboard());
  }, [dispatch]);

  return (
    <section className="leaderboards-page">
      <div className="leaderboards-page__container">
        <header className="leaderboards-page__header">
          <h2>🏆 Klasemen Pengguna Aktif</h2>
          <p>Pengguna dengan skor tertinggi berdasarkan kontribusi di forum.</p>
        </header>

        <main className="leaderboards-page__content">
          <LeaderboardList leaderboard={leaderboard} />
        </main>
      </div>
    </section>
  );
};

export default LeaderboardsPage;
