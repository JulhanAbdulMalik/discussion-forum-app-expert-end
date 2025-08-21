const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    if (response.status >= 400) {
      throw new Error(
        responseJson.message || `HTTP error! status: ${response.status}`
      );
    }

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  }

  // ====================================================================================
  // == ENDPOINTS PENGGUNA (USERS)

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (response.status !== 201) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (response.status !== 200) {
      throw new Error(responseJson.message);
    }

    // Menyimpan token setelah login berhasil
    putAccessToken(responseJson.data.token);
    return responseJson.data.token;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();

    if (response.status !== 200) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.users;
  }

  async function getOwnProfile() {
    const data = await _fetchWithAuth(`${BASE_URL}/users/me`);
    return data.user;
  }

  // ====================================================================================
  // == ENDPOINTS THREADS

  async function createThread({ title, body, category = '' }) {
    const data = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      body: JSON.stringify({ title, body, category }),
    });

    return data.thread;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();

    if (response.status !== 200) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.threads;
  }

  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();

    if (response.status !== 200) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.detailThread;
  }

  // ====================================================================================
  // == ENDPOINTS KOMENTAR (COMMENTS)

  async function createComment({ threadId, content }) {
    const data = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ content }),
      }
    );

    return data.comment;
  }

  // ====================================================================================
  // == ENDPOINTS VOTES

  async function upVoteThread(threadId) {
    const data = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      { method: 'POST' }
    );

    return data.vote;
  }

  async function downVoteThread(threadId) {
    const data = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      { method: 'POST' }
    );

    return data.vote;
  }

  async function neutralizeVoteThread(threadId) {
    const data = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      { method: 'POST' }
    );

    return data.vote;
  }

  async function upVoteComment(threadId, commentId) {
    const data = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      { method: 'POST' }
    );

    return data.vote;
  }

  async function downVoteComment(threadId, commentId) {
    const data = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      { method: 'POST' }
    );

    return data.vote;
  }

  async function neutralizeVoteComment(threadId, commentId) {
    const data = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      { method: 'POST' }
    );

    return data.vote;
  }

  // ====================================================================================
  // == ENDPOINTS LEADERBOARDS

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();

    if (response.status !== 200) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralizeVoteThread,
    upVoteComment,
    downVoteComment,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;

// ====================================================================================
// == CONTOH PENGGUNAAN (BISA DIHAPUS ATAU DIJADIKAN KOMENTAR)
/*
(async () => {
  try {
    // 1. Registrasi pengguna baru
    console.log('Mencoba registrasi...');
    const newUser = await api.register({
      name: 'John Doe',
      email: `john.doe.${Date.now()}@example.com`, // Email unik setiap kali
      password: 'password123',
    });
    console.log('Registrasi berhasil:', newUser);

    // 2. Login untuk mendapatkan token
    console.log('Mencoba login...');
    const token = await api.login({
      email: newUser.email,
      password: 'password123',
    });
    console.log('Login berhasil, token didapat.');
    // Di aplikasi nyata, token sudah disimpan di localStorage oleh fungsi login.

    // 3. Melihat profil sendiri (membutuhkan token)
    console.log('Mengambil profil sendiri...');
    const profile = await api.getOwnProfile();
    console.log('Profil pengguna:', profile);

    // 4. Membuat thread baru (membutuhkan token)
    console.log('Membuat thread baru...');
    const newThread = await api.createThread({
      title: 'Ini Judul Thread via API',
      body: 'Ini adalah isi dari thread yang dibuat melalui api.js.',
      category: 'testing',
    });
    console.log('Thread berhasil dibuat:', newThread);

    // 5. Mengambil semua threads (tidak butuh token)
    console.log('Mengambil semua threads...');
    const allThreads = await api.getAllThreads();
    console.log(`Ditemukan ${allThreads.length} threads.`);

    // 6. Mengambil detail thread
    console.log('Mengambil detail thread pertama...');
    const firstThreadId = allThreads[0].id;
    const threadDetail = await api.getThreadDetail(firstThreadId);
    console.log('Detail thread:', threadDetail);

  } catch (error) {
    // Menangkap dan menampilkan error jika ada request yang gagal
    console.error('Terjadi error pada API call:', error.message);
  }
})();
*/
