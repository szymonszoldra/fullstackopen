import { combineReducers, createStore } from 'redux';
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
  composeWithDevTools()
);

export default store;