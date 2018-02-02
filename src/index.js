import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import queryString from 'query-string';
import pym from 'pym.js';

const params = queryString.parse(window.location.search);
const embed = new pym.Child({polling: 200});

ReactDOM.render(<App {...params} embed={embed} />, document.getElementById('root'));
