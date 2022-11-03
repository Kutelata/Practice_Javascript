import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')!;
const render = ReactDOM.createRoot(root);
render.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
