import React from 'react';
import PropTypes from 'prop-types';
import ThreadItemFooter from './ThreadItemFooter';
import ThreadItemHeader from './ThreadItemHeader';

const ThreadItem = ({ thread, handleVote }) => {
  return (
    <article key={thread.id} className="threads-page__item">
      <ThreadItemHeader thread={thread} />

      <div
        className="threads-page__item-body"
        dangerouslySetInnerHTML={{ __html: thread.body }}
      />

      <ThreadItemFooter thread={thread} handleVote={handleVote} />
    </article>
  );
};

ThreadItem.propTypes = {
  thread: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
};

export default ThreadItem;
