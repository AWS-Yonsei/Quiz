// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // App 컴포넌트를 불러옵니다.
import './index.css';    // 스타일 파일을 불러옵니다. (생략 가능)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
