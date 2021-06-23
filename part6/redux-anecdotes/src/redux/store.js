import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from '../reducers/notificationReducer';
import anecdoteReducer from '../reducers/anecdoteReducer';
import filterReducer from '../reducers/filterReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
});


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;