import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import getEntry from '../../shared/EntryComponent';
import Html from '../../shared/components/Html';
import configureStore from '../../redux/configureStore';
import getRoutes from '../../routes/routes';
import client from '../../configs/apollo';
import { renderToStringWithData } from 'react-apollo';


export default function createHandler() {
  return (req, res) => {
    const memoryHistory = createMemoryHistory(req.originalUrl);

    const { store, history } = configureStore(memoryHistory, client);

    match({
      history,
      routes: getRoutes(store),
      location: req.originalUrl,
    }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.send(error);
      } else if (renderProps) {
        const HtmlComponent = (
          <Html store={store}>
          {getEntry(true, client, store, renderProps)}
          </Html>
        );
        renderToStringWithData(HtmlComponent)
          .then((html) => {
          console.log(html)
            res.status(200).type('html').send(`<!DOCTYPE html>${html}`);
          })
          .catch((apolloError) => {
            console.error(apolloError);
          });
      } else {
        res.status(404).send('not found');
      }
    });
  };
}
