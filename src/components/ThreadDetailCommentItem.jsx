import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

const ThreadDetailCommentItem = ({
  comment,
  handleVote,
  hasVotedUpComment,
  hasVotedDownComment,
}) => {
  return (
    <>
      <div key={comment.id} className="comment-item">
        <header className="comment-item__header">
          <div className="comment-item__owner-info">
            <img src={comment.owner.avatar} alt={comment.owner.name} />
            <b>{comment.owner.name}</b>
          </div>
          <span>{new Date(comment.createdAt).toLocaleDateString('id-ID')}</span>
        </header>

        <div
          className="comment-item__body"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />

        <footer className="comment-item__footer">
          <button
            type="button"
            className="vote-button"
            onClick={() => handleVote('up', comment, comment.id)}
          >
            <FaRegThumbsUp
              style={{ color: hasVotedUpComment ? 'blue' : 'inherit' }}
            />{' '}
            {comment.upVotesBy.length}
          </button>
          <button
            type="button"
            className="vote-button"
            onClick={() => handleVote('down', comment, comment.id)}
          >
            <FaRegThumbsDown
              style={{ color: hasVotedDownComment ? 'red' : 'inherit' }}
            />{' '}
            {comment.downVotesBy.length}
          </button>
        </footer>
      </div>
    </>
  );
};

ThreadDetailCommentItem.propTypes = {
  comment: PropTypes.object,
  handleVote: PropTypes.func,
  hasVotedUpComment: PropTypes.bool,
  hasVotedDownComment: PropTypes.bool,
};

export default ThreadDetailCommentItem;
