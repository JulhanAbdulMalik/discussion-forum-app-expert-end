import React from 'react';
import PropTypes from 'prop-types';
import ThreadDetailCommentItem from './ThreadDetailCommentItem';

const ThreadDetailCommentList = ({ authUser, threadDetail, handleVote }) => {
  return (
    <div className="thread-comments__list">
      {threadDetail.comments.map((comment) => {
        const hasVotedUpComment = authUser
          ? comment.upVotesBy.includes(authUser.id)
          : false;
        const hasVotedDownComment = authUser
          ? comment.downVotesBy.includes(authUser.id)
          : false;

        return (
          <ThreadDetailCommentItem
            key={comment.id}
            comment={comment}
            handleVote={handleVote}
            hasVotedUpComment={hasVotedUpComment}
            hasVotedDownComment={hasVotedDownComment}
          />
        );
      })}
    </div>
  );
};

ThreadDetailCommentList.propTypes = {
  authUser: PropTypes.object,
  threadDetail: PropTypes.object,
  handleVote: PropTypes.func,
};

export default ThreadDetailCommentList;
