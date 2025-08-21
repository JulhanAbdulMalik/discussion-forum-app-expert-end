import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

// Function Thunks

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(upVoteThreadDetailActionCreator({ userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadDetailActionCreator({ userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(downVoteThreadDetailActionCreator({ userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadDetailActionCreator({ userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(neutralizeVoteThreadDetailActionCreator({ userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.neutralizeVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeVoteThreadDetailActionCreator({ userId: authUser.id })
      );
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        downVoteCommentActionCreator({ commentId, userId: authUser.id })
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(
      neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id })
    );

    dispatch(showLoading());

    try {
      await api.neutralizeVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id })
      );
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};
