import React from 'react';
import PropTypes from 'prop-types';

const LeaderboardList = ({ leaderboard }) => {
  return (
    <>
      <div className="leaderboards-page__list-header">
        <p>Pengguna</p>
        <p>Skor</p>
      </div>

      <div className="leaderboards-page__list">
        {leaderboard.map((item, index) => (
          <div key={item.user.id} className="leaderboards-page__item">
            <div className="leaderboards-page__user-info">
              <span className="leaderboards-page__user-rank">{index + 1}</span>
              <img
                className="leaderboards-page__user-avatar"
                src={item.user.avatar}
                alt={`Avatar of ${item.user.name}`}
              />
              <p className="leaderboards-page__user-name">{item.user.name}</p>{' '}
            </div>
            <p className="leaderboards-page__user-score">{item.score}</p>{' '}
          </div>
        ))}
      </div>
    </>
  );
};

LeaderboardList.propTypes = {
  leaderboard: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LeaderboardList;
