import React from 'react';
import ReactDOM from 'react-dom';
import './assets/common.css';
import 'antd/dist/antd.css'
// import './index.css';
import {HashRouter,BrowserRouter} from 'react-router-dom'
import App from './App';

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;

ReactDOM.render(
  <Router>
      <App />
  </Router>,
  document.getElementById('app')
);

