import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ThreadDetailCommentList from './ThreadDetailCommentList';

const ThreadDetailComment = ({
  authUser,
  threadDetail,
  handleVote,
  handleCommentSubmit,
  commentContent,
  setCommentContent,
}) => {
  return (
    <div className="thread-comments">
      {authUser ? (
        <>
          <h2 className="thread-comments__title">Beri Komentar</h2>
          <form
            className="thread-comments__form"
            onSubmit={handleCommentSubmit}
          >
            <textarea
              placeholder="Tulis komentar Anda di sini..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button type="submit">Kirim Komentar</button>
          </form>
        </>
      ) : (
        <p className="login-prompt-text">
          <Link to="/login">Login</Link> untuk memberi komentar.
        </p>
      )}

      <div className="thread-comments__list-header">
        <h3>Komentar ({threadDetail.comments.length})</h3>
      </div>

      <ThreadDetailCommentList
        authUser={authUser}
        threadDetail={threadDetail}
        handleVote={handleVote}
      />
    </div>
  );
};

ThreadDetailComment.propTypes = {
  authUser: PropTypes.object,
  threadDetail: PropTypes.object,
  handleVote: PropTypes.func,
  handleCommentSubmit: PropTypes.func,
  commentContent: PropTypes.string,
  setCommentContent: PropTypes.func,
};

export default ThreadDetailComment;
