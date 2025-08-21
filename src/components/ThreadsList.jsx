import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

const ThreadsList = ({ filteredThreads, handleVote }) => {
  return (
    <>
      <h2>Diskusi Terbaru ({filteredThreads.length})</h2>
      <div className="threads-page__list">
        {filteredThreads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} handleVote={handleVote} />
        ))}
      </div>
    </>
  );
};

ThreadsList.propTypes = {
  filteredThreads: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleVote: PropTypes.func.isRequired,
};

export default ThreadsList;
