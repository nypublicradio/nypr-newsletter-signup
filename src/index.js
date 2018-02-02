import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewsletterSignup from './NewsletterSignup';
import queryString from 'query-string';
import pym from 'pym.js';

const params = queryString.parse(window.location.search);
const embed = new pym.Child({polling: 200});

ReactDOM.render(<NewsletterSignup {...params} embed={embed} />, document.getElementById('root'));
