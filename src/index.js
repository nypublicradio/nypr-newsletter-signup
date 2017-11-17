import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import queryString from 'query-string';

const params = queryString.parse(window.location.search);

ReactDOM.render(<App {...params} />, document.getElementById('root'));
