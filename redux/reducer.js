import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ApplicationReducer from './application/reducer';

export default (client) => {
  return combineReducers({
    routing: routerReducer,
    application: ApplicationReducer,
    apollo: client.reducer(),
  });
};
