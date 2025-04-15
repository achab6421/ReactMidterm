import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 僅引入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// 移除 AdminLTE 本地引用
// import 'admin-lte/dist/css/adminlte.min.css';
// import 'admin-lte/dist/js/adminlte.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
