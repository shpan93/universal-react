import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from '../shared/pages/Root';
import MainPage from '../shared/pages/MainPage';

export default function getRoutes() {
  return (
    <Route name="Root" path="/" component={Root}>
      <Route path=":post" component={MainPage} />
    </Route>
  );
}
