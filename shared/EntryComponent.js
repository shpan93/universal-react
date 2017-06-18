import React from 'react';
import { Router, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

export default function (isServer, client, store, renderProps) {
  const RouterComponent = isServer ? RouterContext : Router;
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterComponent {...renderProps} />
      </Provider>
    </ApolloProvider>
  );
}
