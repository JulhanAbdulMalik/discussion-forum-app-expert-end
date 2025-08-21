import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ThreadItemHeader = ({ thread }) => {
  return (
    <header className="threads-page__item-header">
      <span className="threads-page__item-category">#{thread.category}</span>
      <Link to={`/threads/${thread.id}`} className="threads-page__item-title">
        <h3>{thread.title}</h3>
      </Link>
    </header>
  );
};

ThreadItemHeader.propTypes = {
  thread: PropTypes.object,
};

export default ThreadItemHeader;
