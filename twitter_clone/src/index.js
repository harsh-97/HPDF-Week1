import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Feed from './search.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Feed/>, document.getElementById('root'));
registerServiceWorker();
