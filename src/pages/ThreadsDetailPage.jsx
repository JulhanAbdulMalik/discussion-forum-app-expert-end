import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  asyncAddComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import ThreadDetailComment from '../components/ThreadDetailComment';

const ThreadsDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));

    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [id, dispatch]);

  // Fungsi untuk menambah komentar
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!authUser) {
      alert('Anda harus login untuk berkomentar!');
      navigate('/login');
      return;
    }
    dispatch(asyncAddComment({ threadId: id, content: commentContent }));
    setCommentContent(''); // Mengosongkan textarea setelah submit
  };

  // Fungsi terpadu untuk menangani semua jenis vote
  const handleVote = (voteType, entity, entityId = null) => {
    if (!authUser) {
      alert('Anda harus login untuk memberikan vote!');
      navigate('/login');
      return;
    }

    const hasVotedUp = entity.upVotesBy.includes(authUser.id);
    const hasVotedDown = entity.downVotesBy.includes(authUser.id);
    const isComment = !!entityId; // Cek apakah ini vote untuk comment

    if (voteType === 'up') {
      if (hasVotedUp)
        dispatch(
          isComment
            ? asyncNeutralizeVoteComment(entityId)
            : asyncNeutralizeVoteThreadDetail()
        );
      else
        dispatch(
          isComment ? asyncUpVoteComment(entityId) : asyncUpVoteThreadDetail()
        );
    } else if (voteType === 'down') {
      if (hasVotedDown)
        dispatch(
          isComment
            ? asyncNeutralizeVoteComment(entityId)
            : asyncNeutralizeVoteThreadDetail()
        );
      else
        dispatch(
          isComment
            ? asyncDownVoteComment(entityId)
            : asyncDownVoteThreadDetail()
        );
    }
  };

  if (!threadDetail) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Sedang memuat data...</p>
      </div>
    );
  }

  const hasVotedUpThread = authUser
    ? threadDetail.upVotesBy.includes(authUser.id)
    : false;
  const hasVotedDownThread = authUser
    ? threadDetail.downVotesBy.includes(authUser.id)
    : false;

  return (
    <section className="threads-detail-page">
      {/* Konten Utama Thread */}
      <ThreadDetail
        threadDetail={threadDetail}
        handleVote={handleVote}
        hasVotedUpThread={hasVotedUpThread}
        hasVotedDownThread={hasVotedDownThread}
      />

      {/* Bagian Komentar */}
      <ThreadDetailComment
        authUser={authUser}
        threadDetail={threadDetail}
        handleVote={handleVote}
        handleCommentSubmit={handleCommentSubmit}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
      />
    </section>
  );
};

export default ThreadsDetailPage;
