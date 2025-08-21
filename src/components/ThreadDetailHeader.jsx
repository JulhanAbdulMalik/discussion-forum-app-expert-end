import PropTypes from 'prop-types';
import React from 'react';

const ThreadDetailHeader = ({ threadDetail }) => {
  return (
    <header className="thread-detail__header">
      <span className="thread-detail__category">#{threadDetail.category}</span>
      <h1 className="thread-detail__title">{threadDetail.title}</h1>
      <div className="thread-detail__owner-info">
        <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} />
        <span>
          {threadDetail.owner.name} •{' '}
          {new Date(threadDetail.createdAt).toLocaleDateString('id-ID')}
        </span>
      </div>
    </header>
  );
};

ThreadDetailHeader.propTypes = {
  threadDetail: PropTypes.object,
};

export default ThreadDetailHeader;
