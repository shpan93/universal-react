// import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import getEntry from './shared/EntryComponent';
import configureStore from './redux/configureStore';
import getRoutes from './routes/routes';
import './sass/common.scss';

const { store, history } = configureStore(browserHistory, window.App);
match({
  history,
  routes: getRoutes(store),
}, (error, redirectLocation, renderProps) => {
  render(
    getEntry(false, store, renderProps)
    , document.getElementById('app'));
});

