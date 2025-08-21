import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

const ThreadDetailFooter = ({
  threadDetail,
  handleVote,
  hasVotedUpThread,
  hasVotedDownThread,
}) => {
  return (
    <footer className="thread-detail__footer">
      <button
        type="button"
        className="vote-button"
        onClick={() => handleVote('up', threadDetail)}
      >
        <FaRegThumbsUp
          style={{ color: hasVotedUpThread ? 'blue' : 'inherit' }}
        />{' '}
        {threadDetail.upVotesBy.length}
      </button>
      <button
        type="button"
        className="vote-button"
        onClick={() => handleVote('down', threadDetail)}
      >
        <FaRegThumbsDown
          style={{ color: hasVotedDownThread ? 'red' : 'inherit' }}
        />{' '}
        {threadDetail.downVotesBy.length}
      </button>
    </footer>
  );
};

ThreadDetailFooter.propTypes = {
  threadDetail: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
  hasVotedUpThread: PropTypes.bool.isRequired,
  hasVotedDownThread: PropTypes.bool.isRequired,
};

export default ThreadDetailFooter;
