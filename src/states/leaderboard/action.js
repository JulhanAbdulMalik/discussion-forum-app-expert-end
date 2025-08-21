import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
};

function receiveLeaderboardActionCreator(leaderboard) {
  return {
    type: ActionType.RECEIVE_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
}

// Function Thunks

function asyncPopulateLeaderboard() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboard = await api.getLeaderboards();
      dispatch(receiveLeaderboardActionCreator(leaderboard));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderboardActionCreator,
  asyncPopulateLeaderboard,
};
