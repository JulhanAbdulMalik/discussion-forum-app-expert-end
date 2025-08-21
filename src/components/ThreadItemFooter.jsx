import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegCommentAlt,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from 'react-icons/fa';

const ThreadItemFooter = ({ thread, handleVote }) => {
  return (
    <footer className="threads-page__item-footer">
      <button
        type="button"
        className="threads-page__item-vote-button"
        onClick={() => handleVote(thread.id, 'up', thread.hasVotedUp)}
      >
        <FaRegThumbsUp
          style={{ color: thread.hasVotedUp ? 'blue' : 'inherit' }}
        />{' '}
        {thread.upVotesBy.length} Like
      </button>
      <button
        type="button"
        className="threads-page__item-vote-button"
        onClick={() => handleVote(thread.id, 'down', thread.hasVotedDown)}
      >
        <FaRegThumbsDown
          style={{ color: thread.hasVotedDown ? 'red' : 'inherit' }}
        />{' '}
        {thread.downVotesBy.length} Dislike
      </button>
      <p className="threads-page__item-comments">
        <FaRegCommentAlt /> {thread.totalComments} Komentar
      </p>
      <span className="threads-page__item-owner">
        Dibuat oleh <b>{thread.owner.name}</b>
      </span>
      <span className="threads-page__item-created">
        Dibuat pada:{' '}
        {new Date(thread.createdAt).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </span>
    </footer>
  );
};

ThreadItemFooter.propTypes = {
  thread: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
};

export default ThreadItemFooter;
