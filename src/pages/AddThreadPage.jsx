import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/action';
import AddThreadInput from '../components/AddThreadInput';

const AddThreadPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddThread = (event) => {
    event.preventDefault();

    if (!title || !body) {
      alert('Judul dan Diskusi tidak boleh kosong!');
      return;
    }

    dispatch(asyncAddThread({ title, category, body }));

    navigate('/');
  };

  return (
    <section className="add-thread-page">
      <div className="add-thread-page__container">
        <header className="add-thread-page__header">
          <h2>Buat Diskusi Baru</h2>
          <p>Bagikan ide atau pertanyaanmu dengan komunitas!</p>
        </header>

        <main className="add-thread-page__content">
          <AddThreadInput
            handleAddThread={handleAddThread}
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            body={body}
            setBody={setBody}
          />
        </main>
      </div>
    </section>
  );
};

export default AddThreadPage;
