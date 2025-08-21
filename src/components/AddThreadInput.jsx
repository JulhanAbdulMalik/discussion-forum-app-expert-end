import React from 'react';
import PropTypes from 'prop-types';

const AddThreadInput = ({
  handleAddThread,
  title,
  setTitle,
  category,
  setCategory,
  body,
  setBody,
}) => {
  return (
    <form onSubmit={handleAddThread} className="add-thread-page__form">
      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          type="text"
          placeholder="Judul diskusi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Kategori (Opsional)</label>
        <input
          id="category"
          type="text"
          placeholder="contoh: react, javascript"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Diskusi</label>
        <div className="add-thread-page__diskusi">
          <textarea
            id="body"
            placeholder="Tulis diskusi Anda di sini..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="5"
          />
          <button type="submit">Kirim Thread</button>
        </div>
      </div>
    </form>
  );
};

AddThreadInput.propTypes = {
  handleAddThread: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
  setBody: PropTypes.func.isRequired,
};

export default AddThreadInput;
