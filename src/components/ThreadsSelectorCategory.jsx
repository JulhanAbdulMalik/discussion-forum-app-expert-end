import React from 'react';
import PropTypes from 'prop-types';

const ThreadsSelectorCategory = ({
  uniqueCategories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <>
      <h2>Kategori Populer</h2>
      <div className="threads-page__categories-list">
        <button
          type="button"
          className={`threads-page__category-item ${
            selectedCategory === '' ? 'active' : ''
          }`}
          onClick={() => setSelectedCategory('')}
        >
          Semua
        </button>
        {uniqueCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`threads-page__category-item ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </>
  );
};

ThreadsSelectorCategory.propTypes = {
  uniqueCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default ThreadsSelectorCategory;
