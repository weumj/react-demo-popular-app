import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import configureStore from './store';

const initialState = {};
// const store = configureStore(initialState, browserHistory);
const store = configureStore(initialState);


ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
