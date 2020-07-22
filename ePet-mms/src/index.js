import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import 'antd/dist/antd.css';
import './assets/css/common.css'
import {HashRouter,BrowserRouter} from 'react-router-dom';

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
)