import React from 'react';
import PropTypes from 'prop-types';
import ThreadDetailFooter from './ThreadDetailFooter';
import ThreadDetailHeader from './ThreadDetailHeader';

const ThreadDetail = ({
  threadDetail,
  handleVote,
  hasVotedUpThread,
  hasVotedDownThread,
}) => {
  return (
    <article className="thread-detail">
      <ThreadDetailHeader threadDetail={threadDetail} />

      <div
        className="thread-detail__body"
        dangerouslySetInnerHTML={{ __html: threadDetail.body }}
      />

      <ThreadDetailFooter
        threadDetail={threadDetail}
        handleVote={handleVote}
        hasVotedUpThread={hasVotedUpThread}
        hasVotedDownThread={hasVotedDownThread}
      />
    </article>
  );
};

ThreadDetail.propTypes = {
  threadDetail: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
  hasVotedUpThread: PropTypes.bool.isRequired,
  hasVotedDownThread: PropTypes.bool.isRequired,
  hasVotedNeutralThread: PropTypes.bool.isRequired,
};

export default ThreadDetail;
