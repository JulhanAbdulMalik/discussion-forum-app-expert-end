import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import ThreadsPage from './pages/ThreadsPage';
import AddThreadPage from './pages/AddThreadPage';
import ThreadsDetailPage from './pages/ThreadsDetailPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading... </p>
      </div>
    );
  }

  // Jika user belum login
  if (!authUser) {
    return (
      <div className="app-container">
        <Header authUser={null} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ThreadsPage />} />
            <Route path="/threads/:id" element={<ThreadsDetailPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Redirect ke halaman login */}
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer logout={null} />
      </div>
    );
  }

  // Jika user sudah login
  return (
    <div className="app-container">
      <Header authUser={authUser} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ThreadsPage />} />
          <Route path="/add-thread" element={<AddThreadPage />} />
          <Route path="/threads/:id" element={<ThreadsDetailPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />

          {/* Redirect ke halaman utama */}
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer authUser={authUser} logout={onLogout} />
    </div>
  );
}

export default App;
