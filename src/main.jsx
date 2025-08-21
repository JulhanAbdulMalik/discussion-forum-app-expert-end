import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Loading from './components/Loading.jsx';

import { Provider } from 'react-redux';
import store from './states/index.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Loading />
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
