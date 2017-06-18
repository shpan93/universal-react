import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default function configureStore(baseHistory, initialState = {}) {
  const routingMiddleware = routerMiddleware(baseHistory);
  const middleware = applyMiddleware(routingMiddleware, thunk);
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  const store = createStore(reducer, initialState, compose(
    middleware,
      composeEnhancers,
  ));
  const history = syncHistoryWithStore(baseHistory, store);
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      return store.replaceReducer(require('./reducer').default); // eslint-disable-line global-require
    },
    );
  }

  return { store, history };
}
