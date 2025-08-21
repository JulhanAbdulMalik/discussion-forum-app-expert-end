import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import {
  asyncPopulateThreads,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';
import { asyncPopulateUsers } from '../states/users/action';
import ThreadsSelectorCategory from '../components/ThreadsSelectorCategory';
import ThreadsList from '../components/ThreadsList';

const ThreadsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Data dari Redux store
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateThreads());
    dispatch(asyncPopulateUsers());
  }, [dispatch]);

  const handleVote = (threadId, voteType, hasVoted) => {
    if (!authUser) {
      alert('Anda harus login untuk memberikan vote!');

      navigate('/login');
      return;
    }

    if (hasVoted) {
      dispatch(asyncNeutralizeVoteThread(threadId));
    } else if (voteType === 'up') {
      dispatch(asyncUpVoteThread(threadId));
    } else {
      dispatch(asyncDownVoteThread(threadId));
    }
  };

  // Menggabungkan data threads dengan data owner (user)
  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId) || {},
    hasVotedUp: authUser ? thread.upVotesBy.includes(authUser.id) : false,
    hasVotedDown: authUser ? thread.downVotesBy.includes(authUser.id) : false,
  }));

  // Membuat daftar kategori unik dari threads yang ada
  const uniqueCategories = [
    ...new Set(threads.map((thread) => thread.category)),
  ];

  // Filter threads berdasarkan kategori yang dipilih
  const filteredThreads = selectedCategory
    ? threadList.filter((thread) => thread.category === selectedCategory)
    : threadList;

  return (
    <section className="threads-page">
      <header className="threads-page__header">
        <ThreadsSelectorCategory
          uniqueCategories={uniqueCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </header>

      <main className="threads-page__content">
        <ThreadsList
          filteredThreads={filteredThreads}
          handleVote={handleVote}
        />

        {/* Menampilkan "Tambah Thread" jika sudah login */}
        {authUser && (
          <div className="threads-page__add-thread">
            <Link to="/add-thread" className="threads-page__add-thread-button">
              <FaPlus />
            </Link>
          </div>
        )}
      </main>
    </section>
  );
};

export default ThreadsPage;
