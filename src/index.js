/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import './styles/styles.css';
import '../node_modules/toastr/build/toastr.min.css';

// This internally calls either the development or production version of createStore.
// Additional middleware is used for better developer experience (immutability check).
const store = configureStore();

// browserHistory - we're going for clean URLs
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
